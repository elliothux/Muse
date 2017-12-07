
import { setAttributes } from '../utils';



function createElement(node) {
    // node: String || {
    //     elementName: String
    //     children: node[]
    //     attributes: Object
    // }
    if (typeof node === "string")
        return document.createTextNode(node);
    const el = document.createElement(node.elementName);
    node.children && appendChildren(el, node.children);
    setAttributes(el, node.attributes);
    return el;
}


function appendChildren(target, children) {
    children.map(createElement)
        .forEach(target.appendChild.bind(target))
}



export {
    createElement
}
