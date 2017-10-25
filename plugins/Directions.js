
module.exports = function ({types: t}) {
    let attrName = 'f-if';

    function JSXAttributeVisitor(node) {
        if (node.node.name.name === attrName) {
            // console.log(node.node)
        }
    }

    function JSXElementVisitor(path) {
        attrName = this.opts && this.opts.attrName || attrName;

        path.traverse({
            JSXAttribute: JSXAttributeVisitor,
            JSXElement: JSXElementVisitor
        });
        const ifBinding = getIfBinding(path.node.openingElement);
        if (ifBinding) {
            console.log(path.node);
        }

        function getIfBinding(openingElement) {
            if (openingElement.type !== 'JSXOpeningElement') return;
            return openingElement.attributes.filter(attr => attr.name.name === attrName)[0]
        }
    }

    return {
        visitor: {
            JSXElement: JSXElementVisitor
        }
    }
};
