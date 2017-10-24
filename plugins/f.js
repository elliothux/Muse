function objValueStr2AST(objValueStr, t) {
    const values = objValueStr.split('.');
    if (values.length === 1)
        return t.identifier(values[0]);
    return t.MemberExpression(
        objValueStr2AST(values.slice(0, values.length - 1).join('.'), t),
        objValueStr2AST(values[values.length - 1], t)
    )
}

function objPropStr2AST(key, value, t) {
    return t.objectProperty(
        t.identifier(key),
        objValueStr2AST(value, t)
    )
}

function objExpression2Str(expression) {
    let objStr;
    switch (expression.object.type) {
        case 'MemberExpression':
            objStr = objExpression2Str(expression.object);
            break;
        case 'Identifier':
            objStr = expression.object.name;
            break;
        case 'ThisExpression':
            objStr = 'this';
            break;
    }
    return objStr + '.' + expression.property.name;
}


module.exports = function ({types: t}) {
    let attrName = 'model';

    const JSXAttributeVisitor = function (node) {
        if (node.node.name.name === attrName) {
            let modelStr = objExpression2Str(node.node.value.expression).split('.');
            if (modelStr[0] !== 'this' || modelStr[1] !== 'state') return;
            modelStr = modelStr.slice(2, modelStr.length).join('.');

            const setStateCall = t.callExpression(
                t.memberExpression(
                    t.thisExpression(),
                    t.identifier('setState')
                ),
                [t.objectExpression(
                    [objPropStr2AST(modelStr, 'e.target.value', t)]
                )]
            );

            node.node.name.name = 'value';
            const onInput = node.parent.attributes.filter(attr => attr.name.name === 'onInput')[0];
            if (onInput) {
                const callee = onInput.value.expression;
                onInput.value = t.JSXExpressionContainer(
                    t.arrowFunctionExpression(
                        [t.identifier('e')],
                        t.blockStatement([
                            t.expressionStatement(setStateCall),
                            t.expressionStatement(
                                t.callExpression(
                                    callee,
                                    [t.identifier('e')]
                                )
                            )
                        ])
                    )
                )
            } else {
                node.insertAfter(t.JSXAttribute(
                    t.jSXIdentifier('onInput'),
                    t.JSXExpressionContainer(
                        t.arrowFunctionExpression(
                            [t.identifier('e')], setStateCall
                        )
                    )
                ));
            }
        }
    };

    const JSXElementVisitor = function (path) {
        attrName = this.opts && this.opts.attrName || attrName;
        path.traverse({
            JSXAttribute: JSXAttributeVisitor
        });
    };

    return {
        visitor: {
            JSXElement: JSXElementVisitor
        }
    }
};
