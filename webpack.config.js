
const path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, './lib/index.ts'),
        test: path.join(__dirname, './test/index.tsx'),
    },
    output: {
        path: path.join(__dirname, './dist/'),
        filename: '[name].build.js',
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            {
                test: /\.ts/,
                loader: 'ts-loader',
                exclude: /node_modules\/(?!(stardust))/
            },
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules\/(?!(stardust))/,
                query: {
                    "presets": [
                        ["env", {
                            "targets": {
                                "browsers": ["last 2 versions", "safari >= 7"]
                            }
                        }]
                    ]
                }
            },
        ],
    },
    target: "web"
};