
const template = require('babel-template');



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
    return template('!!VALUE')({ VALUE: value })
}


function getAttr(openingElement, attrName) {
    const attrs = openingElement.attributes;
    return attrs.filter(
        attr => attr.name && attr.name.name && attr.name.name === attrName
    )[0];
}



module.exports = {
    setValueAST,
    eventHandlerAST,
    toBoolAST,
    getAttr
};
