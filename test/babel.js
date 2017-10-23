
const babel = require('babel-core');

const code = `
const state = {
  age: {
 	t: 20
  }
};


render(
  <input
    type="number"
    model={state.age.t}
    placeholder="Hello"
  />
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
