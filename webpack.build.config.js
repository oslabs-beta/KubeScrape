const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src');

module.exports = {
  module: {
    // specifies rules to transpile frontend code
    rules: [
      {
        // condition to match files using regex
        test: /\.s?css$/,
        // loaders to use
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        // An array of path or directories that have the files to be transformed by the loader
        include: defaultInclude,
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
        include: defaultInclude,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude,
      },
    ],
  },

  // Webpack can compile for multiple environments aka targets
  // 'electron-renderer' instructs webpack to compile for Electron for the renderer process
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'bundle.css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // new MinifyPlugin()
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false,
  },

  // tells webpack to minimize the bundle using the TerserPlugin, or the plugin(s) specified by optimization.minimizer
  optimization: {
    minimize: true,
  },
};
