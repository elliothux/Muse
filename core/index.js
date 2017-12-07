
import { createElement } from 'mo-dom';
import { Observer } from './observer/index';




class Component {
    constructor() {

    }

    renderTo = (entry) => {
        this.entry = entry;
        this.entry.appendChild(
            DOM.createElement(this.render())
        )
    }
}



export default Component;
