
import { createElement, diff, patch } from './dom';
import { Observer } from './observer/index';




class Component {
    constructor() {
        this.state = Observer.from(
            this.state || {}
        );
    }

    diff = () => {

    }

    renderTo = (entry) => {
        console.log(this.render());
        this.entry = entry;
        this.entry.appendChild(
            createElement(this.render())
        )
    }
}



export default Component;
