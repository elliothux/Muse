
import { createElement } from './dom';
import { Observer } from './observer/index';




class Component {
    constructor() {

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
