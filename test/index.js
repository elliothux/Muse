
import { F, FDom } from '../lib';
import createElement from 'virtual-dom/create-element';



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
    const entry = document.getElementById('root');
    FDom.render(entry, C);
};
