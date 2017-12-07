
import { createElement, diff, patch } from './dom';
import { Observer } from './observer/index';



class Component {
    constructor() {}

    entry = null;
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
    }
    setterCallback(obj, key, value, oldValue) {
        if (obj !== this.state)
            throw new Error('BOOM!!!');
        console.log(obj, key, value, oldValue);
    }

    // Render
    beforeRender() {
        this.initObserver();
    }
    render() {}
    diff() {};
    patch() {};
    renderTo(entry) {
        console.log(this.render());
        this.beforeRender();
        this.entry = entry;
        this.entry.appendChild(
            createElement(this.render())
        )
    };
}



export default Component;
