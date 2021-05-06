var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker')
module.exports = {
    context: __dirname,
    entry: './assets/js/index.js',
    output: {
        path: path.resolve('./assets/bundles/'),
        filename: '[name]-[hash].js'
    },
    plugins: [
        new BundleTracker({ filename: './webpack-stats.json' })
    ],
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    }
};