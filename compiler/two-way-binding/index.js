
const { handleText, handleCheckbox } = require('./handlers');
const { getAttr } = require('./utils');



module.exports = function ({types: t}) {
    let attrName = 'model';
    let eventName = 'onChange';

    function JSXElementVisitor(path) {
        const openingElement = path.node.openingElement;

        const nodeType = openingElement.name.name;
        if (!['input', 'textarea'].includes(nodeType)) return;

        let inputType;
        if (nodeType === 'input') {
            inputType = getAttr(openingElement, 'type');
            if (!inputType) return;
            inputType = inputType.value.type === 'JSXExpressionContainer' ?
                inputType.value.expression.value : inputType.value.value;
        }

        const modelBinding = getAttr(openingElement, attrName);
        if (!modelBinding || !modelBinding.value ||
            modelBinding.value.type !== 'JSXExpressionContainer') return;

        const textTypes = ['text', 'number', 'password', 'color',
            'date', 'datetime-local', 'email', 'month'];
        if (nodeType === 'textarea' || textTypes.includes(inputType))
            return handleText(t, modelBinding, openingElement, eventName);
        if (['checkbox', 'radio'].includes(inputType))
            return handleCheckbox(t, modelBinding, openingElement, eventName);
    }

    return {
        visitor: {
            JSXElement: function (path) {
                attrName = this.opts && this.opts.attrName || attrName;
                eventName = this.opts && this.opts.eventName || eventName;

                path.traverse({
                    JSXElement: JSXElementVisitor
                });
            }
        }
    }
};
