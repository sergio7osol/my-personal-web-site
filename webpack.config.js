const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production'; 

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("isProduction:", isProduction);

let DIST_DIR = path.resolve(__dirname, "public");
let SRC_DIR = path.resolve(__dirname, "src");

const extractHbs = new HtmlWebpackPlugin({
    template: './home.hbs', // to get the template from - src/...
    filename: '../views/home.hbs', // the file to put the generated HTML into - public/...
    inject: 'body',
    hash:  false
})
const extractScss = new ExtractTextPlugin({
    filename: "css/[name].[hash].css"
 });

console.log("src: ", SRC_DIR + "/js/index.js");

const config = {
    entry: SRC_DIR + "/js/index.js",
    output: {
        path: DIST_DIR, // directory to initially output files into
        publicPath: "/",
        filename: "js/bundle.[hash]js"
    },
    context: SRC_DIR,
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            }, {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          name: '[path][name].[ext]',
                          context: SRC_DIR
                        }  
                      }, {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractHbs,
        extractScss
    ]
}

module.exports = config;