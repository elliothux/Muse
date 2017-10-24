const colors = require('colors/safe');
const log = function (text) {
    typeof text === 'object' && (text = JSON.stringify(text, null, 4));
    console.log(colors.red.bold(text))
}.bind(console);


module.exports = function ({types: t}) {
    const JSXAttributeVisitor = function (node) {
        if (node.node.name.name === 'model') {
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
                            [t.objectExpression([
                                t.objectProperty(
                                    t.identifier('age'),
                                    t.memberExpression(
                                        t.memberExpression(
                                            t.identifier('e'),
                                            t.identifier('target')
                                        ),
                                        t.identifier('value')
                                    )
                                )
                            ])]
                        )
                    ))
            ));
        }
    };

    const JSXElementVisitor = function (path) {
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
