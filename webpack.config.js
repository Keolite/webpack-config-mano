const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizeWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
<<<<<<< HEAD
=======


>>>>>>> 573fc4fe2fd881b7554561e97f77bd3c419971e3

module.exports = {
    entry : {
        main: './src/index.js',
        form: './src/form.js',
        contact: './src/contact.js',
        utils: ['./src/utils/check-navigator.js', './src/utils/fullscreen.js']
    },
    output : {        
        filename : '[name]-bundle.js',               
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
                test : /\.(jpe?g|png|gif)$/i,               
                type: "asset/resource",
                generator: {
                    filename: 'assets/[name][ext]'
                }


            },
            {
                test: /\.woff2$/i,
                type: "asset/resource",
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            }
            
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            chunks: ['utils','main'],
            inject : true,
            minify : true,
            meta:{
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                description: 'Ceci est un page pour webpack'
            },
            template: './src/index.html',
            filename: '../app/index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['utils','form'],
            inject : true,
            minify : true,
            meta:{
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                description: 'Ceci est un page pour webpack'
            },
            template: './src/form.html',
            filename: '../app/form.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['utils','contact'],
            inject : true,
            minify : true,
            meta:{
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                description: 'Ceci est un page pour webpack'
            },
            template: './src/contact.html',
            filename: '../app/contact.html'
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
                            encodeOptions : {
                                webp: {
                                    quality: 60
                                }
                            }
                        }
                    }
                ]
            }) 
        ]
    },
    devServer : {
        static : {
            directory: path.join(__dirname, 'app')
        },
        compress : true,
        port: 3000,
        hot: false,
        liveReload : true,
        open :true,             
        client: {
            progress: true,
            overlay: {
                errors: true,
                warnings: false,
                runtimeErrors: true
            }
        },
        headers: {
            'Manu': 'Cool la life'
        }
    }
    
};  