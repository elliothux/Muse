
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
        };
}

function isChanged(newNode, oldNode) {
    return typeof newNode !== typeof oldNode ||
        typeof newNode !== "object" && newNode !== oldNode ||
        typeof newNode === "object" && newNode.elementName !== oldNode.elementName
}


function diffAttributes(newNode, oldNode) {
    const patches  = [];
    const attributes = {...oldNode.attributes, ...newNode.attributes};
    Object.keys(attributes)
        .forEach(attrName => {
            const newAttr = newNode.attributes[attrName];
            const oldAttr = oldNode.attributes[attrName];
            if (newAttr === undefined && oldAttr !== undefined)
                return patches.push({
                    type: ChangeType.REMOVE_PROPS,
                    oldValue: oldAttr, attrName
                });
            if (oldAttr === undefined && newAttr !== undefined)
                return patches.push({
                    type: ChangeType.SET_PROPS,
                    value: newAttr, attrName
                });
            if (newAttr !== undefined && oldAttr !== undefined && oldAttr !== newAttr)
                return patches.push({
                    type: ChangeType.UPDATE_PROPS,
                    value: newAttr, oldValue: oldAttr, attrName
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

