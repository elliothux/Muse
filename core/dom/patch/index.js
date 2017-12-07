
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
            console.log(parent);
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
