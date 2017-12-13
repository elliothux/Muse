
import {Muse} from '../index';
import ListItem from './components/listItem';



class App extends Muse {
    state = {
        name: 'Joe',
        age: 22,
        langs: [
            'JavaScript',
            'Python',
            'Rust',
            'Scala'
        ],
        showHello: true,
        color: ''
    }

    computed = {
        isAgeOdd() {
            return this.state.age % 2 !== 0
        }
    }

    handleClick = () => {
        this.state.age++;
    }

    render() {
        return (
            <div>
                <h1 if={this.state.showHello}>Hello!</h1>
                <input
                    type="password"
                    model={this.state.name}
                />
                <input
                    type="checkbox"
                    model={this.state.showHello}
                />
                <p style={{color: this.state.color}}>{this.state.color}</p>
                <input type="color" model={this.state.color}/>
                <p>My name is {this.state.name}.</p>
                <p>
                    I'm {this.state.age} years old
                    <span if={this.computed.isAgeOdd}> and it's an odd number.</span>
                </p>
                <p>And I can those programming languages:</p>
                <ul>
                    <ListItem for={lang in this.state.langs} text={lang}/>
                </ul>
                <button onClick={this.handleClick}>Click Me</button>
            </div>
        )
    }
}


const app = new App();
app.renderTo(document.getElementById('root'));
