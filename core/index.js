
import { createElement, diff, patch } from './dom';
import { Observer, observer, walk } from './observer';
import { flattenNode } from './utils'



class Component {
    constructor() {}

    entry = null;
    node = null;
    state = {};
    computed = {};

    // TODO: LifeCycle
    componentWillMount() {};
    componentDidMount() {};
    componentWillReceiveProps() {};
    shouldComponentUpdate() {
        return true
    };
    componentWillUpdate() {};
    componentDidUpdate() {};
    componentWillUnmount() {};
    componentDidCatch() {};

    // Observer
    initObserver() {
        this.state = Observer.from(
            this.state || {},
            ::this.setterCallback
        );
    };
    initComputed() {
        walk(
            this.computed,
            (name, getter, computed) => {
                Object.defineProperty(computed, name, {
                    enumerable: true,
                    configurable: false,
                    get: this::getter
                })
            }
        )
    }
    setterCallback(obj, key, value, oldValue) {
        if (obj !== this.state)
            throw new Error('BOOM!!!');
        this.diffAndPatch();
    };

    // Render
    beforeRender() {
        this.initObserver();
        this.initComputed();
    };
    render() {};
    renderTo(entry) {
        this.beforeRender();
        this.node = flattenNode(this.render());
        this.entry = entry;
        this.entry.appendChild(createElement(this.node))
    };
    diffAndPatch() {
        const oldNode = this.node;
        this.node = flattenNode(this.render());
        const patches = diff(this.node, oldNode);
        patch(this.entry, patches);
    };
}



export default Component;
