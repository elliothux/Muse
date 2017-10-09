
const colors = require('colors/safe');
const log = function (text) {
    typeof text === 'object' && (text = JSON.stringify(text, null, 4));
    console.log(colors.red.bold(text))
}.bind(console);


module.exports = function (babel) {
    const getAndRemoveBindingAttr = (jsxElement, attrName) => {
        const { attributes } = jsxElement.openingElement;
        let value;
        const index = attributes.findIndex((attr, index) => {
            if (attr.name && attr.name.name === attrName) {
                value = attr.value;
                return true
            }
        });
        if (index !== -1) {
            attributes.splice(index, 1)
        }
        return value
    };

    return {
        visitor: {
            JSXElement: function(path, state) {
                const { attributes } = path.node.openingElement;
                log(attributes)
                // log(path.node.openingElement);
                // log(this.opts)
                // const { attrName } = this.opts;
            }
        }
    }
};
