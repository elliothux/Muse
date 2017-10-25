
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
            list1: [1, 2, 3, 4, 5],
            list2: [1, 2, 3, 4, 5],
            show: false
        }
    }

    render() { return(
        <div>
            <h1>Binding data: {this.state.age.value.v}</h1>
            <p f-for={"(i, index) in this.state.list1"} key={index}>
                <span>{i}</span>
                <span>---</span>
                <span f-for={"(j, index) in this.state.list2"} key={j + index}>{i+j}</span>
            </p>
        </div>
    )}
}


const app = (new App2()).renderTo(document.getElementById('root'));
console.log(app);
