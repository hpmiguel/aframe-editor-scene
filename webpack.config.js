const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const basePath = __dirname;
const distPath = 'dist';

function getWebpackConfig(env) {
    let mode, devtool;
    if (env.production) {
        mode = 'production';
        devtool = 'inline-source-map';
    } else if (env.development) {
        mode = 'development';
        devtool = 'none';
    }
    return {
        mode: mode,
        resolve: {
            extensions: [ '.ts', '.js' ]
        },
        entry: {
            app: ['./src/main.ts']
        },
        output: {
            path: path.join(basePath, distPath),
            filename: '[hash][name].js'
        },
        devtool: devtool,
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new HTMLWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html'
            })
        ]
    };
}

module.exports = getWebpackConfig;
