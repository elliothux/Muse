
function setAttributes(target, attributes) {
    Object.keys(attributes)
        .filter(key => attributes.hasOwnProperty(key))
        .forEach(attrName => setAttribute(target, attrName, attributes[attrName]));
}

function setAttribute(target, attrName, attrValue) {
    attrName === 'className' && (attrName = 'class');
    target.setAttribute(attrName, attrValue);
}

function removeAttribute(target, attrName) {
    attrName === 'className' && (attrName = 'class');
    target.removeAttribute(attrName);
}



export default {
    setAttributes,
    setAttribute,
    removeAttribute
}
