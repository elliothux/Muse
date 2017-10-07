
import { F, FDom } from '../lib';


class C {
    constructor() {
        this.state = {
            name: 'Joe',
            age: 10
        }
    }

    render() { return (
        <div>
            <h1>My name is {this.state.name}</h1>
        </div>
    )}
}


window.onload = function () {
    const f = new C();
    const root = document.getElementById('root');
    FDom.render(root, f)
};
