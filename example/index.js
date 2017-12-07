
import { Component } from '../index';



class App extends Component {
    constructor(...args) {
        super(...args);
    }

    render() { return (
        <div>
            <h1>Hello</h1>
        </div>
    )}
}


const app = new App();
app.renderTo(document.getElementById('root'));
