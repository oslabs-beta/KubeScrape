const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { spawn } = require('child_process')

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src')

module.exports = {
  module: {

    // specifies rules to transpile frontend code
    rules: [
      {
        // condition to match files using regex
        test: /\.css$/,
        // loaders to use
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }],
        // An array of path or directories that have the files to be transformed by the loader
        include: defaultInclude
      },
      {
        test: /\.jsx?$/,
        use: [{ 
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        }],
        include: defaultInclude
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude
      }
    ]
  },
  // Webpack can compile for multiple environments aka targets. 
  // 'electron-renderer' instructs webpack to compile for Electron for renderer process
  target: 'electron-renderer', 
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  // chooses a style of source mapping to enhance the debugging process
  // a source map maps the code a in a compressed file back to its original position in the source file.
  // major browsers have built-in support for source maps.
  devtool: 'cheap-source-map',
  devServer: {
    // specifies the directory of static files to be served
    contentBase: path.resolve(__dirname, 'dist'),
    stats: {
      colors: true,
      chunks: false,
      children: false
    },
    // the before hook runs before the devServer starts and can be used to run node js code
    before() {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
      .on('close', code => process.exit(0))
      .on('error', spawnError => console.error(spawnError))
    }
  }
}
