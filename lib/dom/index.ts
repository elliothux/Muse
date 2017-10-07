
import { h, create as createElement } from 'virtual-dom';



function jsx2virtualDom(jsxObject) {
    if (typeof jsxObject !== 'object') return jsxObject;
    let children = jsxObject.children;
    if (Array.isArray(children))
        children = jsxObject.children.map(c => jsx2virtualDom(c));
    return h(
        jsxObject.elementName,
        jsxObject.attributes,
        children
    )
}


function render(entry: HTMLElement, C) {
    const jsxObject = (new C()).render();
    console.log(jsx2virtualDom(jsxObject));
    const content = createElement(jsx2virtualDom(jsxObject));
    console.log(content);
    entry.appendChild(content)
}


export {
    render
}