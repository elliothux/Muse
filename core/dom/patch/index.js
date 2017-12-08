
import { ChangeType } from '../types';
import { createElement } from '../create/index';
import { setAttribute, removeAttribute } from "../utils/index";
import {EventMap, EventType} from "../types/events";



function patch(parent, patches, index=0) {
    if (!patches) return;
    const el = parent.childNodes[index];
    switch (patches.type) {
        case ChangeType.CREATE: {
            const { newNode } = patches;
            const newEl = createElement(newNode);
            if (index === parent.childNodes.length)
                parent.appendChild(newEl);
            else parent.insertBefore(newEl, el);
            break;
        }
        case ChangeType.REMOVE: {
            if (!el) return;
            parent.removeChild(el);
            break;
        }
        case ChangeType.REPLACE: {
            const { newNode } = patches;
            const newEl = createElement(newNode);
            parent.replaceChild(newEl, el);
            break;
        }
        case ChangeType.UPDATE: {
            const { children, attributes } = patches;
            patchAttributes(el, attributes);
            children.forEach((child, index) => patch(el, child, index));
            break;
        }
    }
}


function patchAttributes(element, attributes) {
    attributes.forEach(patch => {
        const { type, attrName, value, oldValue } = patch;
        const isEvent = EventType.includes(attrName);
        const eventName = isEvent && EventMap[attrName];

        // !isEvent && console.log(type, attrName, value, oldValue);
        if (type === ChangeType.SET_PROPS)
            return isEvent ?
                element.addEventListener(eventName, value) :
                setAttribute(element, attrName, value);
        if (type === ChangeType.REMOVE_PROPS)
            return isEvent ?
                element.removeEventListener(eventName, oldValue) :
                removeAttribute(element, attrName, value);
        if (type === ChangeType.UPDATE_PROPS) {
            if (isEvent) {
                element.removeEventListener(eventName, oldValue);
                return element.addEventListener(eventName, value);
            }
            setAttribute(element, attrName, value, oldValue);
        }
    })
}


export {
    patch
}
