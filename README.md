# Muse

✨ A light-weight and fast front-end framework

* Supporting JSX  
* Virtual DOM  
* Two-way Data Binding  
* Observable State  
* State Management  
* Directives  
* Supporting HOC  
* More Future...


## Project Plan

### Done
✔ First Render using Virtual DOM   
✔ Diff and Patch Render  
✔ Observer State  
✔ Computed Data  
✔ Handle Events

### Todo
* [ ] Components and Props
* [ ] Life Cycle Hooks  
* [ ] Events Encapsulation
* [ ] Dependence Collection
* [ ] Supporting Watch
* [ ] Supporting Directives
* [ ] More Efficient Diff Render


## Usage

### Run Example
`git clone https://github.com/HuQingyang/Muse && cd ./Muse`  
`npm install`
`npm start`  


### Example
```jsx harmony
import { Muse } from 'muse.js';

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
            <p>My name is {this.state.name}.</p>
            <p>
                I'm {this.state.age} years old
                <span if={this.computed.isAgeOdd}>and it's an odd number.</span>
            </p>
            <p>And I can those programming languages:</p>
            <ul>
                <li for={(lang, index) in this.state.langs}>{lang}</li>
            </ul>
            <button onClick={this.handleClick}>Click Me</button>
        </div>
    )}
}

const app = new App();
app.renderTo(document.getElementById('root'));
```
See also [Example](https://github.com/HuQingyang/Muse/blob/master/example/index.js)
