
import { F } from '../lib';



class App extends F {
    constructor() {
        super();
        this.state = {
            name: 'Joe',
            age: 10,
            color: 'red'
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleClick() {
        this.setState({
            age: this.state.age + 1
        })
    }

    render() { return (
        <div>
            <h3>My name is {this.state.name}</h3>
            <h4>And I'm {this.state.age} years old</h4>
            <input type="text" value={this.state.name} onInput={this.handleName}/>
            <button onClick={this.handleClick}>Click</button>
        </div>
    )}
}


const app = (new App()).renderTo(document.getElementById('root'));
console.log(app);
