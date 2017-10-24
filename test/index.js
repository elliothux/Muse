
import { F } from '../lib';


class App2 extends F {
    constructor() {
        super();
        this.state ={
            age: 20
        }
    }

    render() { return(
        <div>
            <h1>Test</h1>
            <input
                type="number"
                model={this.state.age}
                placeholder="Hello"
            />
        </div>
    )}
}


const app = (new App2()).renderTo(document.getElementById('root'));
console.log(app);
