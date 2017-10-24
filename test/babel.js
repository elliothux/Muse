
const babel = require('babel-core');

const code = `
const state = {
  age: {
 	t: 20
  }
};

render(
<div>
  <h1>Hello</h1>
  <input
    type="number"
    model={state.age.t}
    onInput={(e) => {this.setState({ age: e.target.value })}}
    placeholder="Hello"
  />
</div>
)
`;

const result = babel.transform(code, {
    plugins: [
        ["../plugins/f.js", {
            "attrName": "model"
        }],
        "transform-jsx"
    ],
});


// console.log(result);
