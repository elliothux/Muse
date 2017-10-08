
import { h, create, diff } from 'virtual-dom';
import parser from './parser';



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


function render(entry: HTMLElement, jsxObject) {
    const content = create(jsx2virtualDom(jsxObject));
    console.log(jsxObject);
    Array.from(entry.children).map(c => entry.removeChild(c));
    entry.appendChild(content);
    return content;
}



export {
    render,
    parser
}