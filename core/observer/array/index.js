
import { walk, observer } from '../utils/index';



export default class ObserverArray {
    constructor(array, setterCallback, getterCallback) {
        !array && (array = []);
        if (!Array.isArray(array))
            throw new TypeError('Type "Array" required!');
        walk(array, (index, item) => observer(
            this, index, item,
            setterCallback, getterCallback
        ));
        this.length = array.length;
    }


    static from = (array, setterCallback, getterCallback) => {
        return new ObserverArray(
            array,
            setterCallback,
            getterCallback
        )
    };
    static isObserverArray  = array => {
        return array.__proto__.constructor === ObserverArray;
    };
    static of = (...args) => {
        return new ObserverArray([...args])
    };


    concat = (...arrays) => {
        const newArray = new ObserverArray();
        [this, ...arrays].forEach(
            array => array.forEach(newArray.push)
        );
        return newArray;
    };
    copyWithin = (...args) => {
        // TODO
        return ObserverArray.from(
            Array.from(this).copyWithin(...args)
        )
    };
    entries = function *() {
        let index = 0;
        while (this[index])
            yield [index++, this[index]];
    };
    every = () => {};
    fill = () => {};
    filter = () => {};
    find = () => {};
    findIndex = () => {};
    forEach = () => {};
    includes = () => {};
    indexOf = () => {};
    join = () => {};
    keys = () => {};
    lastIndexOf = () => {};
    map = () => {};
    pop = () => {};
    push = value => {
        observer(
            this, this.length, value,
            setterCallback, getterCallback
        );
        this.length ++;
        return value;
    };
    reduce = () => {};
    reduceRight = () => {};
    reverse = () => {};
    shift = () => {};
    slice = () => {};
    some = () => {};
    sort = () => {};
    splice = () => {};
    toLocaleString = () => {};
    toSource = () => {};
    toString = () => {
        return `ObserverArray [...]`
    };
    unshift = () => {};
    values = () => {};
}
