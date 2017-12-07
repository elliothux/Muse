
import { setAttributes } from '../utils';



function createElement(node) {
    /*
    node: String || {
        elementName: String
        children: node[]
        attributes: Object
    }
    */
    if (typeof node === 'object') {
        const el = document.createElement(node.elementName);
        node.children && appendChildren(el, node.children);
        setAttributes(el, node.attributes);
        return el;
    }
    else return document.createTextNode(node);
}


function appendChildren(target, children) {
    children.map(createElement)
        .forEach(target.appendChild.bind(target))
}



export {
    createElement
}
