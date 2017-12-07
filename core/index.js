
import { createElement, diff, patch } from './dom';
import { Observer } from './observer/index';



class Component {
    constructor() {}

    entry = null;
    node = null;
    state = {};

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
    setterCallback(obj, key, value, oldValue) {
        if (obj !== this.state)
            throw new Error('BOOM!!!');
        this.diffAndPatch();
    };

    // Render
    beforeRender() {
        this.initObserver();
    };
    render() {};
    renderTo(entry) {
        this.beforeRender();
        this.node = this.render();
        this.entry = entry;
        this.entry.appendChild(createElement(this.node))
    };
    diffAndPatch() {
        const oldNode = this.node;
        this.node = this.render();
        const patches = diff(this.node, oldNode);
        patch(this.entry, patches);
    };
}



export default Component;
