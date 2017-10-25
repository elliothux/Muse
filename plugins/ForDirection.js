
function objValueStr2AST(objValueStr, t) {
    const values = objValueStr.split('.');
    if (values.length === 1)
        return t.identifier(values[0]);
    return t.memberExpression(
        objValueStr2AST(values.slice(0, values.length - 1).join('.'), t),
        objValueStr2AST(values[values.length - 1], t)
    )
}


module.exports = function ({types: t}) {
    let attrName = 'f-for';

    function JSXElementVisitor(path) {
        attrName = this.opts && this.opts.attrName || attrName;

        path.traverse({ JSXElement: JSXElementVisitor });

        const forBinding = getAndRemoveForBinding(path.node.openingElement);
        if (forBinding) {
            let [params, array] = forBinding.value.expression.value.split(' in ').map(v => v.trim());
            params = /\(.+\)/.test(params) ?
                params.replace(/(\(|\))/g, '').split('.').map(v => v.trim()).map(p => t.identifier(p)) :
                [t.identifier(params)];
            array = t.callExpression(
                t.memberExpression(t.identifier('Array'), t.identifier('from')),
                [objValueStr2AST(array, t)]
            );

            path.replaceWith(t.jSXExpressionContainer(
                t.callExpression(
                    t.memberExpression(array, t.identifier('map')),
                    [t.callExpression(
                        t.memberExpression(
                            t.arrowFunctionExpression(params, path.node),
                            t.identifier('bind')
                        ),
                        [t.thisExpression()]
                    )]
                )
            ))
        }

        function getAndRemoveForBinding(openingElement) {
            if (openingElement.type !== 'JSXOpeningElement') return;
            const index = openingElement.attributes.findIndex(attr => attr.name.name === attrName);
            if (index >= 0) {
                const forBinding = openingElement.attributes[index];
                openingElement.attributes = openingElement.attributes.filter(attr => attr !== forBinding);
                return forBinding;
            }
        }
    }

    return {
        visitor: {
            JSXElement: JSXElementVisitor
        }
    }
};
