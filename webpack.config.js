const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : {
        main: './src/index.js'
    },
    output : {
        filename : 'index-bundle.js',
        clean: true,
        path: path.resolve(__dirname, 'app')
    },
    plugins : [
        new HtmlWebpackPlugin({
            inject : true,
            minify : false,
            meta:{
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                description: 'Ceci est un page pour webpack'
            }
        })
    ]
    
};  