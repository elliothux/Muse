
import { EventType, EventMap } from '../types';



function setAttributes(target, attributes={}) {
    Object.keys(attributes)
        .filter(key => attributes.hasOwnProperty(key))
        .forEach(attrName => setAttribute(target, attrName, attributes[attrName]));
}


function setAttribute(target, attrName, attrValue) {
    attrName === 'className' && (attrName = 'class');
    if (EventType.includes(attrName))
        return target.addEventListener(
            EventMap[attrName],
            attrValue
        );
    target.setAttribute(attrName, attrValue);
}


function removeAttribute(target, attrName, oldAttrValue) {
    attrName === 'className' && (attrName = 'class');
    if (EventType.includes(attrName))
        return target.addEventListener(
            EventMap[attrName],
            oldAttrValue
        );
    target.removeAttribute(attrName);
}


function insertAfter(newEl, targetEl) {
    const parentEl = targetEl.parentNode;
    if (parentEl.lastChild === targetEl)
        return parentEl.appendChild(newEl);
    return parentEl.insertBefore(newEl,targetEl.nextSibling);
}


export {
    setAttributes,
    setAttribute,
    removeAttribute,
    insertAfter
}
