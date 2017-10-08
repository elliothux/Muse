
import { render } from '../dom';



export default class F {
    public state: object;
    public render: () => object;
    private entry: HTMLElement;

    constructor() {
        this.state = {}
    }

    setState(arg) {
        this.state = Object.assign(this.state, arg);
        this.renderToDom();
    }

    public renderTo(entry: HTMLElement) {
        this.entry = entry;
        this.renderToDom();
    }

    private renderToDom() {
        render(this.entry, this.render())
    }
}
