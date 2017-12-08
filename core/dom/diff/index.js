
import { ChangeType, EventType } from '../types/index';



function diff(newNode, oldNode) {
    /*
    return type Patch {
        type: ChangeType
        newNode?: Node
        children?: Patch[]
        attributes?: Patch[]
    }
     */
    if (!oldNode) return { type: ChangeType.CREATE, newNode };
    else if (!newNode) return { type: ChangeType.REMOVE };
    else if (isChanged(newNode, oldNode)) return { type: ChangeType.REPLACE, newNode };
    else if (newNode.elementName)
        return {
            type: ChangeType.UPDATE,
            children: diffChildren(newNode, oldNode),
            attributes: diffAttributes(newNode, oldNode),
            events: diffEvents(newNode, oldNode)
        };
}

function isChanged(newNode, oldNode) {
    return typeof newNode !== typeof oldNode ||
        typeof newNode !== "object" && newNode !== oldNode ||
        typeof newNode === "object" && newNode.elementName !== oldNode.elementName
}


function diffEvents(newNode, oldNode) {
    const patches  = [];
    const attributes = {...oldNode.attributes, ...newNode.attributes};
    Object.keys(attributes)
        .filter(attrName => EventType.includes(attrName))
        .forEach(eventName => {
            const newHandler = newNode.attributes[eventName];
            const oldHandler = oldNode.attributes[eventName];
            if (!newHandler)
                return patches.push({
                    type: ChangeType.REMOVE_EVENT_LISTENER,
                    value: oldHandler, eventName
                });
            else if (!oldHandler)
                patches.push({
                    type: ChangeType.ADD_EVENT_LISTENER,
                    value: newHandler, eventName
                });
            else patches.push({
                    type: ChangeType.UPDATE_EVENT_LISTENER,
                    value: newHandler, oldValue: oldHandler, eventName
                });
        });
    return patches;
}

function diffAttributes(newNode, oldNode) {
    const patches  = [];
    const attributes = {...oldNode.attributes, ...newNode.attributes};
    Object.keys(attributes)
        .filter(attrName => !EventType.includes(attrName))
        .forEach(attrName => {
            const newAttr = newNode.attributes[attrName];
            const oldAttr = oldNode.attributes[attrName];
            !newAttr && patches.push({
                type: ChangeType.REMOVE_PROPS,
                value: oldAttr, attrName
            });
            (!oldAttr || oldAttr !== newAttr) && patches.push({
                type: ChangeType.SET_PROPS,
                value: newAttr, attrName
            });
        });
    return patches;
}


function diffChildren(newNode, oldNode) {
    const newChild = newNode.children || [];
    const oldChild = oldNode.children || [];
    return [...Array(Math.max(
        newChild.length, oldChild.length
    )).keys()].map(i => diff(newChild[i], oldChild[i]));
}


export {
    diff
}

