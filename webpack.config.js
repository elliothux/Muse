
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';



const config = {
    devtool: 'inline-source-map',
    entry: {
        index: path.join(__dirname, './index.js'),
        example: path.join(__dirname, './example/index.js'),
    },
    output: {
        path: path.join(__dirname, './dist/'),
        filename: '[name].build.js',
        publicPath: '/assets/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules\/(?!(stardust))/,
            }
        ],
    },
    target: "web"
};


if (isDev) {
    config.devServer = {
        hot: true,
        contentBase: './example',
        publicPath: '/assets/',
        disableHostCheck: true,
        open: false
    };
}



module.exports = config;
