const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizeWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry : {
        main: './src/index.js'
    },
    output : {
        filename : 'index-bundle.js',
        clean: true,
        path: path.resolve(__dirname, 'app')
    },
    module:{
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: 
                        [
                            ['@babel/preset-env', {targets: {"ie": "11"}}]
                        ]
                    }
                }
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            inject : true,
            minify : true,
            meta:{
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                description: 'Ceci est un page pour webpack'
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        })

    ],
    optimization :{
        minimizer: [
            new CssMinimizeWebpackPlugin(),
            new TerserPlugin({
                test: /\.js$/i,
                exclude: /node_modules/
            }),
        ]
    }
    
};  