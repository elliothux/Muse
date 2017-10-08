
import { h, create, diff, patch } from 'virtual-dom';



function jsx2vTree(jsxTree) {
    if (typeof jsxTree !== 'object') return jsxTree;
    let { elementName, attributes, children } = jsxTree;
    if (Array.isArray(children))
        children = jsxTree.children.map(c => jsx2vTree(c));
    return h(elementName, handleAttr(attributes), children)
}


function render(entry: HTMLElement, vTree): Element {
    const realDom = create(vTree);
    entry.appendChild(realDom);
    return realDom;
}


function diffRender(realDom: Element, preTree, newTree) {
    const patches = diff(preTree, newTree);
    patch(realDom, patches);
    return newTree
}


function handleAttr(attr: object): object {
    attr = handleEvent(attr);
    attr = handleModel(attr);
    return attr
}

function handleEvent(attr: object): object {
    Object.keys(attr)
        .filter(key => attr.hasOwnProperty(key))
        .filter(key => /on[A-Z]([a-z]|[A-Z])+/.test(key))
        .map(key => {
            attr[key.toLowerCase()] = attr[key];
            delete attr[key];
        });
    return attr
}

function handleModel(attr): object {
    if (attr.hasOwnProperty('model')) {

    }
    return attr
}


export {
    jsx2vTree,
    render,
    diffRender
}
