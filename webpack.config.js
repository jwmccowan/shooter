const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
    filename: 'shooter.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'src/assets',
                to: 'assets'
            },
            {
                from: 'src/index.html'
            }
        ])
    ]
};

