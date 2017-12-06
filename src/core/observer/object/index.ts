

import { walk, observer } from '../utils'



class Observer {
    constructor(obj) {
        if (typeof obj !== "object")
            throw new TypeError('Type "Array" required!');
        walk(obj, (key, value) => observer(
            this, key, value,
            (obj, key, value) => console.log(`Get ${key} of ${obj}: ${value}`),
            (obj, key, newValue) => console.log(`Set ${key} of ${obj}: ${newValue}`)
        ));
    }

    static from = obj => {
        return new Observer(obj)
    };

    static toString = () => {
        return `Observer ${this}`
    };
}


export default Observer;
