
const colors = require('colors/safe');

module.exports = function (babel) {
    return {
        visitor: {
            // JSXIdentifier: function(path) {
            //     console.log(colors.red.underline("Visiting: " + path.node.name));
            // },
            // JSXAttribute: function(path) {
            //     console.log(colors.blue.underline("Visiting: " + path.node.name));
            // },
            JSXElement: function(path, state) {
                console.log(colors.red.bold.underline("Visiting: " + path));
            }
        }
    }
};
