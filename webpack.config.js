const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.NODE_ENV || "development";
const DISCORD_INVITE = process.env.DISCORD_INVITE || "https://discord.com";

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: "./index.ts",
	mode: ENV,
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: "[name].[contenthash].js",
		clean: {
			keep: /index.html/,
		},
	},
	resolve: {
		extensions: [".js", ".ts", ".scss"],
		alias: {
			"react": "preact/compat",
			"react-dom/test-utils": "preact/test-utils",
			"react-dom": "preact/compat",
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ["ts-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					ENV === "production"
						? MiniCssExtractPlugin.loader
						: "style-loader",
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				type: ENV === "production" ? "asset/resource" : "asset/inline",
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
			minify: { collapseWhitespace: true },
		}),
		new webpack.DefinePlugin({
			"ENV": JSON.stringify(ENV),
			"DISCORD_INVITE": JSON.stringify(DISCORD_INVITE)
		}),
	].concat(ENV === "development" ? [
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./sample-servers.json", to: "./servers.json" },
			],
		}),
	] : []),
	optimization: {
		minimize: ENV === "production" ? true : false,
		minimizer: [new UglifyJsPlugin({
			uglifyOptions: {
				mangle: true,
				compress: true,
			},
		})],
	},
	devtool: ENV === "production" ? false : "inline-source-map",
	devServer: {
		port: process.env.PORT || 8080,
		host: "0.0.0.0",
		publicPath: "/",
		contentBase: "./src",
		historyApiFallback: {
			rewrites: [
				{ from: /.*/, to: "/index.html" },
			]
		}
	},
};
