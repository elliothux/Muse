
const { objValueStr2AST } = require('../utils');



module.exports = function ({types: t}) {
    let attrName = 'for';

    function JSXElementVisitor(path) {
        path.traverse({ JSXElement: JSXElementVisitor });

        const element = path.node.openingElement;
        const forBinding = getAndRemoveForBinding(element);
        if (!forBinding) return;

        let [params, array] = parseForBinding(forBinding);
        if (params.length < 1 || !array) return;

        params = params.map(p => t.identifier(p));
        array = t.callExpression(
            t.memberExpression(t.identifier('Array'), t.identifier('from')),
            typeof array === 'string' ?
                [objValueStr2AST(array, t)] :
                [array]
        );

        const newNode = t.jSXExpressionContainer(
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
        );

        path.replaceWith(newNode);


        function getAndRemoveForBinding(openingElement) {
            if (openingElement.type !== 'JSXOpeningElement') return;
            const index = openingElement.attributes.findIndex(attr => (attr && attr.name && attr.name.name) === attrName);
            if (index < 0) return;

            let forBinding = openingElement.attributes[index].value;
            openingElement.attributes = openingElement.attributes.filter(attr => attr.name && attr.name.name !== attrName);

            if (forBinding.type === 'StringLiteral')
                return forBinding.value;
            else if (forBinding.type === 'JSXExpressionContainer' && forBinding.expression) {
                if (forBinding.expression.type === 'StringLiteral')
                    return forBinding.expression.value;
                else if (forBinding.expression.type === 'BinaryExpression')
                    return forBinding.expression;
            }
        }

        function parseForBinding(forBinding) {
            let params = null;
            let array = null;

            if (typeof forBinding === 'string') {
                [params, array] = forBinding.split(' in ').map(v => v.trim());
                params = params.replace(/(\(|\))/g, '').split(',').map(v => v.trim())
            } else if (typeof forBinding === 'object') {
                let { left, operator, right } = forBinding;
                if (operator !== 'in') throw new Error(`Operator ${operator} not allowed here, using "in" instead!`);
                if (left.type === 'Identifier')
                    params = [left.name];
                else if (left.type === 'SequenceExpression')
                    params = left.expressions.map(i=> i.name);

                if (right.type === 'Identifier')
                    array = right.name;
                else array = right;
            }
            return [params, array]
        }
    }

    return {
        visitor: {
            JSXElement: JSXElementVisitor
        }
    };
};
