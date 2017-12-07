
import { walk, observer } from '../utils/index'



export default class Observer {
    constructor(obj, setterCallback, getterCallback) {
        if (typeof obj !== "object")
            throw new TypeError('Type "Array" required!');
        walk(obj, (key, value) => observer(
            this, key, value,
            getterCallback,
            setterCallback
        ));
    }

    static from = (obj, setterCallback, getterCallback) => {
        return new Observer(
            obj,
            setterCallback,
            getterCallback
        )
    };

    static toString = () => {
        return `Observer ${this}`
    };
}
