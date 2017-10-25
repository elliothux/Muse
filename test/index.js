
import { F } from '../lib';


class App2 extends F {
    constructor() {
        super();
        this.state ={
            age: {
                t: 2,
                value: {
                    v: 20,
                    p: 11
                }
            },
            list: [1, 2, 3, 4, 5],
            show: false
        }
    }

    render() { return(
        <div>
            <h1>Binding data: {this.state.age.value.v}</h1>
            <span f-for={"(i, index) in this.state.list"} key={index}>{i}</span>
            <br/>
            <span f-for={"(i, index) in this.state.list"} key={index}>{i+1}</span>
        </div>
    )}
}


const app = (new App2()).renderTo(document.getElementById('root'));
console.log(app);
