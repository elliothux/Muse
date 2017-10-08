

module.exports = function (babel) {
    const visitor =  {
        JSXElement (nodePath, state) {
            const { attrName } = this.opts;
            console.log(nodePath);
            // const bindingValue = getAndRemoveBindingAttr(nodePath.node, attrName)
            //
            // if (!bindingValue) return
            //
            // const extracted = extractBindingValue(bindingValue, attrName)
            //
            // let wrappedExpr = types.callExpression(
            //     state.addImport('babel-plugin-react-binding/lib/runtime', 'default', 'binding'),
            //     [nodePath.node, bindingValue.expression, ...extracted],
            // )
            //
            // if (nodePath.parent.type === 'JSXElement') {
            //     wrappedExpr = types.jSXExpressionContainer(wrappedExpr)
            // }
            //
            // nodePath.replaceWith(wrappedExpr)
        }
    };
    return {
        inherits: require('babel-plugin-transform-jsx'),
        visitor,
    }
};
