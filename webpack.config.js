
const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: path.join(__dirname, './src/index.ts'),
        test: path.join(__dirname, './test/index.js'),
    },
    output: {
        path: path.join(__dirname, './dist/'),
        filename: '[name].build.js',
        publicPath: '/assets/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules\/(?!(stardust))/,
            },
        ],
    },
    target: "web"
};
