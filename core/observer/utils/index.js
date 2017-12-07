
import Observer from '../object';
import ObserverArray from '../array';


const noop = () => {};



function walk(obj, fun) {
    if (typeof obj !== 'object')
        throw new TypeError(`Function "walk" require an "object" instead of ${typeof obj}`);
    if (Array.isArray(obj))
        return obj.forEach((item, index) => fun(index, item, obj));
    else
        return Object.keys(obj).forEach(key => fun(key, obj[key], obj));
}

function observer(obj, key, value, setterCallback=noop, getterCallback=noop) {
    if (typeof obj !== 'object')
        throw new TypeError(`Function "observer" require an "object" instead of ${typeof obj}`);

    if (Array.isArray(value))
        value = ObserverArray.from(value);
    else if (typeof value === "object")
        value = Observer.from(value);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            getterCallback(obj, key, value);
            return value
        },
        set: newValue => {
            const oldValue = obj[key];
            observer(obj, key, newValue, setterCallback, getterCallback);
            setterCallback(obj, key, newValue, oldValue);
        }
    })
}


const getUniqueID = function() {
    let id = 0;
    return (() => id ++);
}();


export {
    walk,
    observer,
    getUniqueID
}
