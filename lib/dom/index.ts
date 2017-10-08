
import { h, create, diff, patch } from 'virtual-dom';



function jsx2vTree(jsxTree) {
    if (typeof jsxTree !== 'object') return jsxTree;
    let { elementName, attributes, children } = jsxTree;
    if (Array.isArray(children))
        children = jsxTree.children.map(c => jsx2vTree(c));
    return h(elementName, attributes, children)
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


export {
    jsx2vTree,
    render,
    diffRender
}
