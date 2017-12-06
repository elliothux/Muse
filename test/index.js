
import { Mo } from '../src/core/index.ts';



class App extends Mo {
    constructor(...args) {
        super(...args);
    }

    render() { return (
        <div>
            <h1>Hello</h1>
        </div>
    )}
}


(new App()).renderTo(document.getElementById('root'));
