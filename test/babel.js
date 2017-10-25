
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
    f-model={state.age.t}
    f-if={state.age.show}
    placeholder="Hello"
  />
</div>
)
`;

const result = babel.transform(code, {
    plugins: [
        ["../plugins/TwoWayDataBinding.js", {
            "attrName": "f-model"
        }],
        ["../plugins/IfDirection.js", {
            "attrName": "f-if"
        }],
        "transform-jsx"
    ]
});


// console.log(result);
