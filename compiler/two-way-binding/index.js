
const template = require('babel-template');
const { objValueStr2AST } = require('../utils');


function setValueAST(target, value) {
    const setValueAST = template(`TARGET = VALUE`);
    return setValueAST({
        TARGET: target,
        VALUE: value
    });
}

function eventHandlerAST(t, setValueCall, eventHandler) {
    const eventHandlerAST = template(eventHandler ?
        `e => { SET_VALUE_CALL; EVENT_HANDLER(e) }` :
        `e => SET_VALUE_CALL;`);
    const args = { SET_VALUE_CALL: setValueCall };
    eventHandler && (args.EVENT_HANDLER = eventHandler.value.expression);
    return t.jSXExpressionContainer(eventHandlerAST(args).expression);
}

function toBoolAST(value) {
    return template('!!VALUE')({ value })
}


function getAttr(openingElement, attrName) {
    const attrs = openingElement.attributes;
    return attrs.filter(
        attr => attr.name && attr.name.name && attr.name.name === attrName
    )[0];
}

function handleText(t, modelBinding, openingElement, eventName) {
    modelBinding.name.name = 'value';
    const setValueCall = setValueAST(
        modelBinding.value.expression,
        objValueStr2AST('e.target.value', t)
    );
    const eventHandler = getAttr(openingElement, eventName);
    if (eventHandler)
        eventHandler.value = eventHandlerAST(t, setValueCall, eventHandler);
    else openingElement.attributes.push(t.JSXAttribute(
        t.jSXIdentifier(eventName),
        eventHandlerAST(t, setValueCall)
    ));
}


module.exports = function ({types: t}) {
    let attrName = 'model';
    let eventName = 'onKeyUp';

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

        if (nodeType === 'textarea' || ['text', 'number', 'password'].includes(inputType))
            return handleText(t, modelBinding, openingElement, eventName);
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
