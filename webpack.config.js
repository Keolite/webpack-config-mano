const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizeWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");



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
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader",
                    options: { minimize: true }
                  }
                ]
            },
           
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
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource" , 
                loader: 'url-loader',          
                // If i don't use this generator option, images saved in root (dist) folder -> dist/6gj86ddgt36jjy78.jpg
                generator: { 
                    outputPath: 'assets',                                      
                    filename: "[name][ext]",
                },
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
            },
            template: "./src/index.html",
            filename: "../app/index.html"
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
            new ImageMinimizerPlugin({
                generator: [
                    
                    {
                        preset: "webp",
                        implementation: ImageMinimizerPlugin.sharpGenerate,
                        
                        options: {
                            encodeOptions: {
                                // Please specify only one codec here, multiple codecs will not work
                                webp: {
                                    quality: 90,
                                },
                            },
                        },
                    },
                   
                ] 
            })
        ]
    }
    
};  