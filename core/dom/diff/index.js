
import { ChangeType } from '../types/index';



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
            attributes: diffAttributes(newNode, oldNode)
        };
}

function isChanged(newNode, oldNode) {
    return typeof newNode !== typeof oldNode ||
        typeof newNode === "string" && newNode !== oldNode ||
        typeof newNode !== "string" && newNode.elementName !== oldNode.elementName;
}

function diffAttributes(newNode, oldNode) {
    const patches  = [];
    const attributes = {...oldNode.attributes, ...newNode.attributes};
    Object.keys(attributes).map(attrName => {
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
    return [...Array(Math.max(
        newNode.children.length,
        oldNode.children.length
    )).keys()].map(i => diff(newNode.children[i], oldNode.children[i]));
}


export {
    diff
}

