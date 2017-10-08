
import * as dom from '../dom';



export default class F {
    public state: object;
    public render: () => object;
    private entry: HTMLElement;
    private realDom: Element;
    private preVTree: object;

    constructor() {
        this.state = {};
    }

    setState(arg) {
        this.state = Object.assign(this.state, arg);
        this.diffRender();
        return this;
    }

    get vTree() {
        return dom.jsx2vTree(this.render());
    }

    public renderTo(entry: HTMLElement) {
        this.entry = entry;
        this.preVTree = this.vTree;
        this.realDom = dom.render(this.entry, this.vTree);
        return this;
    }

    private diffRender() {
        this.preVTree = dom.diffRender(
            this.realDom,
            this.preVTree,
            this.vTree
        );
        return this;
    }
}
