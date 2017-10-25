
// 如: this.state.name
function objValueStr2AST(objValueStr, t) {
    // console.log(objValueStr);
    const values = objValueStr.split('.');
    if (values.length === 1)
        return t.identifier(values[0]);
    return t.memberExpression(
        objValueStr2AST(values.slice(0, values.length - 1).join('.'), t),
        objValueStr2AST(values[values.length - 1], t)
    )
}


// 如: { key: value }
function objPropStr2AST(key, value, t) {
    key = key.split('.');
    return t.objectProperty(
        t.identifier(key[0]),
        key2ObjCall(key, t)
    );

    function key2ObjCall(key, t, index) {
        !index && (index = 0);
        if (key.length - 1 === index) return objValueStr2AST(value, t);
        return t.callExpression(
            t.memberExpression(
                t.identifier('Object'),
                t.identifier('assign')
            ),
            [
                objValueStr2AST(indexKey2Str(index + 1, key), t),
                t.objectExpression([
                    t.objectProperty(
                        t.identifier(key[index + 1]),
                        key2ObjCall(key, t, index + 1)
                    )
                ])
            ]
        );

        function indexKey2Str(index, key) {
            const str = ['_state'];
            for (let i = 0; i < index; i++) str.push(key[i]);
            console.log(str.join('.'));
            return str.join('.')
        }
    }
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

    function JSXAttributeVisitor(node) {
        if (node.node.name.name === attrName) {
            let modelStr = objExpression2Str(node.node.value.expression).split('.');
            if (modelStr[0] !== 'this' || modelStr[1] !== 'state') return;

            modelStr = modelStr.slice(2, modelStr.length).join('.');
            const stateDeclaration = t.variableDeclaration(
                'const', [
                    t.variableDeclarator(
                        t.identifier('_state'),
                        t.memberExpression(
                            t.thisExpression(),
                            t.identifier('state')
                        )
                    )
                ]
            );
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
                            stateDeclaration,
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
                            [t.identifier('e')],
                            t.blockStatement([
                                stateDeclaration,
                                t.expressionStatement(setStateCall)
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
