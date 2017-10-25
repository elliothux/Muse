
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
                f-model={this.state.age.value.v}
                type="number"
                placeholder="Hello"
            />
            <div f-if={this.state.age.value.v % 2 === 0}>
                <h1>Yo!!!!</h1>
                <h2 f-if={this.state.age.value.v % 3 === 0}>HO!!!!!</h2>
            </div>
        </div>
    )}
}


const app = (new App2()).renderTo(document.getElementById('root'));
console.log(app);
