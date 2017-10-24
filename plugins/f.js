

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

function objStr2AST(objStr, t) {
    const props = objStr.replace(/(\{\})/g, '').split(';');
    return t.objectExpression(props.map(p => {
        const [key, value] = p.split(':').map(p => p.trim());
        return t.objectProperty(
            t.identifier(key),
            objValueStr2AST(value, t)
        )
    }))
}


module.exports = function ({types: t}) {
    let attrName = 'model';

    const JSXAttributeVisitor = function (node) {
        if (node.node.name.name === attrName) {
            node.node.name.name = 'value';
            node.insertAfter(t.JSXAttribute(
                t.jSXIdentifier('onInput'),
                t.JSXExpressionContainer(
                    t.arrowFunctionExpression(
                        [t.identifier('e')],
                        t.callExpression(
                            t.memberExpression(
                                t.thisExpression(),
                                t.identifier('setState')
                            ),
                            [t.objectExpression(
                                [objPropStr2AST('age', 'e.target.value', t)]
                            )]
                        )
                    ))
            ));
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
