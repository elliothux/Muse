
import * as DOM from 'mo-dom';
import { Observer } from './observer';



interface Node {
    elementName: string,
    attributes: object,
    children: Node[]
}



class Component {
    public state: Observer;
    public render: () => Node;

    public renderTo: (HTMLElement) => void;
    private entry?: HTMLElement;

    constructor() {

    }

    renderTo = (entry: HTMLElement) => {
        this.entry = entry;
        this.entry.appendChild(
            DOM.createElement(this.render())
        )
    }
}



export default Component;
