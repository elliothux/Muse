
import { ChangeType } from '../types';
import { createElement } from '../create/index';
import { setAttribute, removeAttribute } from "../utils/index";



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
            const { children, attributes, events } = patches;
            patchAttributes(el, attributes);
            patchEvents(el, events);
            children.forEach((child, index) => patch(el, child, index));
            break;
        }
    }
}

function patchEvents(el, events) {
    events.forEach(patch => {
        const { type, value, oldValue, eventName } = patch;
        if (type === ChangeType.ADD_EVENT_LISTENER)
            return el.addEventListener(eventName, value);
        if (type === ChangeType.REMOVE_EVENT_LISTENER)
            return el.removeEventListener(eventName, oldValue);
        if (type === ChangeType.UPDATE_EVENT_LISTENER) {
            el.removeEventListener(eventName, oldValue);
            el.addEventListener(eventName, value);
        }
    })
}

function patchAttributes(element, attributes) {
    attributes.forEach(patch => {
        const { type, attrName, value } = patch;
        if (type === ChangeType.SET_PROPS)
            setAttribute(element, attrName, value);
        else if (type === ChangeType.REMOVE_PROPS)
            removeAttribute(element, attrName, value)
    })
}


export {
    patch
}
