const path = require('path');

module.exports = {
    entry : {
        main: './src/index.js'
    },
    output : {
        filename : 'index-bundle.js',
        clean: true,
        path: path.resolve(__dirname, 'app')
    }
};