
import { F } from '../lib';





class App2 extends F {
    constructor() {
        super();
        this.state ={
            age: 20
        }
    }

    render() { return(
        <input
            type="number"
            model={this.state.age}
            placeholder="Hello"
        />
    )}
}


const app = (new App2()).renderTo(document.getElementById('root'));
console.log(app);
