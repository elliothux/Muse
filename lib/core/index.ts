
import { render } from '../dom';



export default class F {
    public state: object;
    public render: () => object;

    constructor() {
        this.state = {}
    }

    public renderTo(entry: HTMLElement) {
        render(entry, this.render())
    }
}
