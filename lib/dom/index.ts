

import h from 'virtual-dom/h';
import createElement from 'virtual-dom/create-element';



function jsx2virtualDom(jsxObject) {
    if (typeof jsxObject !== 'object') return jsxObject;
    let children = jsxObject.children;
    if (Array.isArray(jsxObject.children))
        children = jsxObject.children.map(c => jsx2virtualDom(c));
    return h(
        jsxObject.elementName,
        jsxObject.attributes,
        children
    )
}


function render(entry: HTMLElement, component) {
    const jsxObject = component.render();
    const content = createElement(jsx2virtualDom(jsxObject));
    entry.appendChild(content)
}


export {
    render
}