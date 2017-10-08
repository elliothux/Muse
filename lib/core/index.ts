
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
    }

    get vTree() {
        return dom.jsx2vTree(this.render());
    }

    public renderTo(entry: HTMLElement) {
        this.entry = entry;
        this.preVTree = this.vTree;
        this.realDom = dom.render(this.entry, this.vTree);
    }

    private diffRender() {
        this.preVTree = dom.diffRender(
            this.realDom,
            this.preVTree,
            this.vTree
        )
    }

    // private renderToDom() {
    //     [this.vTree, this.realDom] = render(
    //         this.entry,
    //         this.realDom,
    //         this.vTree,
    //         jsx2vTree(this.render())
    //     )
    // }
}
