
const template = require('babel-template');
const { objValueStr2AST, objExpression2Str} = require('../utils');


function setValueAST(target, value) {
    const setValueAST = template(`TARGET = VALUE`);
    return setValueAST({
        TARGET: target,
        VALUE: value
    });
}


module.exports = function ({types: t}) {
    let attrName = 'model';
    let event = 'onInput';

    function JSXAttributeVisitor(node) {
        if (node.node.name.name === attrName) {
            const setValueCall = setValueAST(
                node.node.value.expression,
                objValueStr2AST('e.target.value', t)
            );

            node.node.name.name = 'value';

            const onChange = node.parent.attributes.filter(
                attr => (attr && attr.name && attr.name.name) === event)[0];
            if (onChange) {
                const callee = onChange.value.expression;
                onChange.value = t.JSXExpressionContainer(
                    t.arrowFunctionExpression(
                        [t.identifier('e')],
                        t.blockStatement([
                            setValueCall,
                            t.expressionStatement(
                                t.callExpression(
                                    callee,
                                    [t.identifier('e')]
                                )
                            )
                        ])
                    )
                );
            } else {
                node.insertAfter(t.JSXAttribute(
                    t.jSXIdentifier(event),
                    t.JSXExpressionContainer(
                        t.arrowFunctionExpression(
                            [t.identifier('e')],
                            t.blockStatement([
                                setValueCall
                            ])
                        )
                    )
                ));
            }
        }
    }

    function JSXElementVisitor(path) {
        attrName = this.opts && this.opts.attrName || attrName;
        path.traverse({
            JSXAttribute: JSXAttributeVisitor
        });
    }

    return {
        visitor: {
            JSXElement: JSXElementVisitor
        }
    }
};
