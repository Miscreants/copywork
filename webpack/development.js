require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const { PORT = 8888, ENVIRONMENT = 'development' } = process.env;

module.exports = {
    mode: 'development',

    devServer: {
        compress: true,
        historyApiFallback: true,
        allowedHosts: 'all',
        host: '0.0.0.0',
        hot: true,
        port: PORT,
    },

    cache: {
        type: 'filesystem',
    },

    devtool: 'eval-source-map',

    entry: path.resolve(__dirname, '..', 'source', 'index_dev.tsx'),

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)|(test\/)/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    },
                ],
            },
            {
                test: /\.md$/,
                type: 'javascript/auto',
                use: [
                    {
                        loader: 'frontmatter-markdown-loader',
                        options: {
                            mode: ['body', 'attributes']
                        }
                    }
                ]
            }
        ],
    },

    optimization: {
        moduleIds: 'deterministic',
        minimize: false,
        splitChunks: {
            chunks: 'all',
        },
    },

    output: {
        chunkFilename: '[name].[chunkhash].js',
        filename: '[name].[chunkhash].js',
        globalObject: 'window',
        path: path.resolve(__dirname, '..', 'build'),
        publicPath: '/',
    },

    plugins: [
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify(ENVIRONMENT),
        }),
        new HtmlWebPackPlugin({
            BUILD_HASH: 'development',
            BUILD_DATE: new Date().toISOString(),
            template: path.resolve(__dirname, '..', 'source', 'index.html'),
            filename: 'index.html',
            scriptLoading: 'defer',
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: false,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
    ],

    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.md'],
        modules: [
            path.resolve(__dirname, '..', 'source'),
            path.resolve(__dirname, '..', 'node_modules'),
        ],
        alias: {
            'react': 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
        },
    },

    stats: 'errors-warnings',
};