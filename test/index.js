
import { F } from '../lib';


class App2 extends F {
    constructor() {
        super();
        this.state ={
            name: 'Hu'
        }
    }

    render() { return(
        <div>
            <h1>I'm {this.state.name}.</h1>
            <input
                type="text"
                model={this.state.name}
                onInput={() => console.log(this.state.name)}
                placeholder="Hello"
            />
        </div>
    )}
}


const app = (new App2()).renderTo(document.getElementById('root'));
console.log(app);
