
module.exports = function ({types: t}) {
    function JSXElementVisitor(path) {
        path.traverse({ JSXElement: JSXElementVisitor });
        if (path.node.children) {
            const children = path.node.children;
            const emptyExpressions = children
                .filter(node => node.type === 'JSXExpressionContainer')
                .filter(node => node.expression && node.expression.type === 'JSXEmptyExpression');
            path.node.children = children.filter(node => !emptyExpressions.includes(node));
        }
    }

    return {
        visitor: {
            JSXElement: JSXElementVisitor
        }
    }
};
