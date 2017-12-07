
import { Component } from '../index';



class App extends Component {
    state = {
        name: 'Joe',
        age: 22
    }

    computed = {
        canDrive() {
            return this.state.age % 2 === 0
        }
    }


    handleClick = () => {
        this.state.age ++;
    }

    render() { return (
        <div>
            {/*<p if={this.computed.canDrive}>I'm {this.state.name}.</p>*/}
            <p>I'm {this.state.age} years old.</p>
            <p>I can <span if={this.computed.canDrive}>not</span> Drive</p>
            <button
                onClick={this.handleClick}
            >Click Me</button>
        </div>
    )}
}



const app = new App();
app.renderTo(document.getElementById('root'));
