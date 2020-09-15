const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: path.join(__dirname, 'src', 'main', 'webapp', 'js', 'src', 'index.js'),
    output: {
        filename: "main.js",
        path: path.join(__dirname, 'src', 'main', 'resources', 'static', 'js'),
    },
    devServer: {
        port: 9000,
        contentBase: path.join(__dirname, 'src', 'main', 'resources', 'static', 'js'),
    }
}