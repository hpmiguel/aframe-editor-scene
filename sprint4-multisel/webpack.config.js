const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const path = require('path');
const basePath = __dirname;
const distPath = 'dist';

function getWebpackConfig(env) {
    let mode, devtool, bundleName;
    if (env.production) {
        mode = 'production';
        devtool = false;
        bundleName = '[name].bundle.js';
    } else if (env.development) {
        mode = 'development';
        devtool = 'eval-source-map';
        bundleName = '[name].bundle.js';
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
            filename: bundleName
        },
        devtool: devtool,
        devServer: {
            overlay: {
                warnings: false,
                errors: true
            },
            https: true
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    // Exports HTML as string, require references to static resources
                    use: ["html-loader"]
                },
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    use: {
                        // The file-loader resolves import/require() on a file into a url and emits the file into the output directory.
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: "imgs"
                        }
                    }
                }
            ]
        },
        plugins: [
            new HTMLWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                inject: 'head'
            }),
            // Deletes the dist folder, so the new .js files wont stack and pollute the folder
            new CleanWebpackPlugin()
        ],
        optimization: {
            usedExports: true,
            minimizer: [new TerserPlugin(), new HTMLWebpackPlugin({
                template: "./src/index.html",
                // Injects file in the head of the html
                inject: 'head',
                // Settings for the html file itself
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })],
            splitChunks: {
                chunks: 'all',
            }
        }
    };
}

module.exports = getWebpackConfig;
