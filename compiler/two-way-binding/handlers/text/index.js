
const { objValueStr2AST } = require('../../../utils/index');
const { setValueAST, eventHandlerAST, getAttr } = require('../../utils');



function handleText(t, modelBinding, openingElement, eventName, attrName='value') {
    if (!modelBinding.name || !modelBinding.name.name)
        throw new Error('Missing name prop at modelBinding.');
    modelBinding.name.name = attrName;
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



module.exports = handleText;
