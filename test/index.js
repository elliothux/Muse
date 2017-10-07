
import { F, FDom } from '../lib';
import createElement from 'virtual-dom/create-element';



class App extends F {
    constructor() {
        super();
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
    const app = new App();
    // app.renderTo(document.getElementById('root'));
};

// class A {
//     constructor() {
//         this.a = 1;
//         this.b = 2;
//     }
//
//     hello() {
//         console.log(`a is ${this.a}, b is ${this.b}`)
//     }
// }
//
// class B extends A {
//     constructor() {
//         super();
//         this.a = 3;
//     }
// }
//
//
// (new B()).hello()