
import { Muse } from '../index';



class App extends Muse {
    state = {
        name: 'Joe',
        age: 22,
        langs: [
            'JavaScript',
            'Python',
            'Rust',
            'Scala'
        ]
    }

    computed = {
        isAgeOdd() {
            return this.state.age % 2 !== 0
        }
    }

    handleClick = () => {
        this.state.age ++;
    }

    render() { return (
        <div>
            <h1>Hello!</h1>
            <input
                type="text"
                model={this.state.name}
                onKeyUp={() => console.log(this.state.name)}
            />
            <p>My name is {this.state.name}.</p>
            <p>
                I'm {this.state.age} years old
                <span if={this.computed.isAgeOdd}> and it's an odd number.</span>
            </p>
            <p>And I can those programming languages:</p>
            <ul>
                <li for={lang in this.state.langs}>{lang}</li>
            </ul>
            <button onClick={this.handleClick}>Click Me</button>
        </div>
    )}
}



const app = new App();
app.renderTo(document.getElementById('root'));
