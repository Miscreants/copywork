require('dotenv').config();

// -----------------------------------------------------------------------------

const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// -----------------------------------------------------------------------------

const { PORT = 8888, ENVIRONMENT = 'development' } = process.env;

// -----------------------------------------------------------------------------

module.exports = {
	mode: 'production',

	devtool: false,

	entry: path.resolve(__dirname, '..', 'source', 'index.tsx'),

	module: {
		rules: [
			{
				test: /.js$/,
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
					},
				],
			},
		],
	},

	optimization: {
		moduleIds: 'deterministic',
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					compress: {
						defaults: true,
						dead_code: true,
					},
				},
			}),
		],
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
			BUILD_HASH: 'analyze',
			BUILD_DATE: new Date().toISOString(),

			template: path.resolve(__dirname, '..', 'source', 'index.html'),
			filename: 'index.html',
			scriptLoading: 'defer',
			inject: 'body',
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
		new BundleAnalyzerPlugin(),
	],

	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
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

	stats: {
		assets: true,
		assetsSpace: 999,
		modules: false,
		moduleAssets: false,
		modulesSpace: 999,
	},
};
