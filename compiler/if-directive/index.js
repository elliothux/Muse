
const template = require('babel-template');


module.exports = function ({types: t}) {
    let attrName = 'if';
    const buildIfTemplate = template(`CONDITION ? VALUE : null`);

    function JSXElementVisitor(path) {
        attrName = this.opts && this.opts.attrName || attrName;

        path.traverse({ JSXElement: JSXElementVisitor });

        const ifBinding = getAndRemoveIfBinding(path.node.openingElement);
        if (ifBinding) {
            path.replaceWith(t.jSXExpressionContainer(
                t.conditionalExpression(
                    ifBinding.value.expression,
                    path.node,
                    t.nullLiteral()
                )
            ))
        }

        function getAndRemoveIfBinding(openingElement) {
            if (openingElement.type !== 'JSXOpeningElement') return;
            const index = openingElement.attributes.findIndex(attr => attr.name && attr.name.name === attrName);
            if (index >= 0) {
                const ifBinding = openingElement.attributes[index];
                openingElement.attributes = openingElement.attributes.filter(attr => attr !== ifBinding);
                return ifBinding;
            }
        }
    }

    return {
        visitor: {
            JSXElement: JSXElementVisitor
        }
    }
};
