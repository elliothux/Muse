
module.exports = function ({types: t}) {
    let attrName = 'f-for';

    function JSXElementVisitor(path) {
        attrName = this.opts && this.opts.attrName || attrName;

        path.traverse({ JSXElement: JSXElementVisitor });

        const forBinding = getAndRemoveForBinding(path.node.openingElement);
        if (forBinding) {
            console.log(forBinding)
        }

        function getAndRemoveForBinding(openingElement) {
            if (openingElement.type !== 'JSXOpeningElement') return;
            const index = openingElement.attributes.findIndex(attr => attr.name.name === attrName);
            if (index >= 0) {
                const forBinding = openingElement.attributes[index];
                openingElement.attributes = openingElement.attributes.filter(attr => attr !== ifBinding);
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
