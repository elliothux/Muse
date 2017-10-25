
const babel = require('babel-core');

const code = `
const state = {
  age: {
 	t: 20,
 	show: true
  }
};

render(
<div>
  <h1>Hello</h1>
  <input
    type="number"
    model={state.age.t}
    f-if={show}
    placeholder="Hello"
  />
</div>
)
`;

const result = babel.transform(code, {
    plugins: [
        ["../plugins/TwoWayDataBinding.js", {
            "attrName": "model"
        }],
        "transform-jsx"
    ],
});


// console.log(result);
