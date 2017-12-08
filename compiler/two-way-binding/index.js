
const template = require('babel-template');
const { objValueStr2AST } = require('../utils');


function setValueAST(target, value) {
    const setValueAST = template(`TARGET = VALUE`);
    return setValueAST({
        TARGET: target,
        VALUE: value
    });
}


module.exports = function ({types: t}) {
    let attrName = 'model';
    let eventName = 'onKeyUp';

    function JSXElementVisitor(path) {
        const openingElement = path.node.openingElement;

        const nodeType = openingElement.name.name;
        if (!['input', 'textarea'].includes(nodeType)) return;

        const modelBinding = getAttr(openingElement, attrName);
        if (!modelBinding || !modelBinding.value ||
            modelBinding.value.type !== 'JSXExpressionContainer') return;
        modelBinding.name.name = 'value';

        const setValueCall = setValueAST(
            modelBinding.value.expression,
            objValueStr2AST('e.target.value', t)
        );

        const eventHandler = getAttr(openingElement, eventName);
        if (eventHandler) {
            const callee = eventHandler.value.expression;
            eventHandler.value = t.JSXExpressionContainer(
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
            openingElement.attributes.push(t.JSXAttribute(
                t.jSXIdentifier(eventName),
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

    function getAttr(openingElement, attrName) {
        const attrs = openingElement.attributes;
        return attrs.filter(
            attr => attr.name && attr.name.name && attr.name.name === attrName
        )[0];
    }

    return {
        visitor: {
            JSXElement: path => {
                attrName = this.opts && this.opts.attrName || attrName;
                eventName = this.opts && this.opts.eventName || eventName;

                path.traverse({
                    JSXElement: JSXElementVisitor
                });
            }
        }
    }
};
