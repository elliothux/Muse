
module.exports = function ({types: t}) {

    function JSXAttributeVisitor(node) {

    }

    function JSXElementVisitor(path) {
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
