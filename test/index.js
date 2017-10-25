
import { F } from '../lib';


class App2 extends F {
    constructor() {
        super();
        this.state ={
            age: {
                t: 2,
                value: {
                    v: 20,
                    p: 11
                }
            },
            list: [1, 2, 3, 4, 5],
            show: false
        }
    }

    render() { return(
        <div>
            <h1>Binding data: {this.state.age.value.v}</h1>
            <input
                type="number"
                f-model={this.state.age.value.v}
                f-if={this.state.show}
                placeholder="Hello"
            />
        </div>
    )}
}


const app = (new App2()).renderTo(document.getElementById('root'));
console.log(app);
