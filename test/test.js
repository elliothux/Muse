
const a = {
    p: {
        a: 1,
        b: {
            t: 99,
            p: 20
        }
    },
    d: 3
};

const b = {
    p: {
        b:{
            p: 30
        }
    }
};

console.log(Object.assign(a, b));