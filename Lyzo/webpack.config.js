const path = require('path');
const statements = require('tsx-control-statements').default;
const keysTransformer = require('ts-transformer-keys/transformer').default;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
	mode: "development",
	entry: './React/index.tsx',
	output: {
	  path: path.resolve(__dirname, 'wwwroot/dist'),
	  filename: 'site.js'
	},
	devtool: "source-map",
	module: {
	  rules: [
		{
		  test: /\.less$/,
		  exclude: /node_modules/,
		  use: [
			'style-loader',
			'css-loader',
			'less-loader'
		  ]
		},
		{
			test: /\.tsx?$/,
			loader: "awesome-typescript-loader",
			exclude: /node_modules/,
			options: {
				getCustomTransformers: program => ({ 
					before: [
						statements(),
						keysTransformer(program)
					], 
				})
			}
		}
	  ]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
		plugins: [new TsconfigPathsPlugin({configFile: "./tsconfig.json"})],
		modules: ["node_modules", "React/Common/"]
	},
  };
  
  module.exports = config;
  