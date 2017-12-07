
function flattenNode(node) {
    if (!node) return;
    if (node.children)
        node.children = flattenChildren(node.children);
    return node
}

function flattenChildren(children) {
    return [].concat(...children)
        .map(node => {
            if (typeof node === 'object')
                return flattenNode(node);
            else return node;
        })
        .filter(node => !!node);
}


export {
    flattenNode
}
