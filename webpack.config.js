module.exports = {
    entry: './src/client.js',
    output: {
        filename: './public/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
            }
        ]
    }
}