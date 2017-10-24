
import { F } from '../lib';


class App2 extends F {
    constructor() {
        super();
        this.state ={
            age: 10
        }
    }

    render() { return(
        <div>
            <h1>I'm {this.state.age} years old.</h1>
            <input
                type="number"
                model={this.state.age}
                onInput={() => console.log('changed!')}
                placeholder="Hello"
            />
        </div>
    )}
}


const app = (new App2()).renderTo(document.getElementById('root'));
console.log(app);
