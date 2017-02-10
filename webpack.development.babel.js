import Webpack from 'webpack'
const HotModuleReplacementPlugin = new Webpack.HotModuleReplacementPlugin()
const NoErrorsPlugin = new Webpack.NoErrorsPlugin()
import config from './config'

const {
  hotLoader: {
    host:hotHost,
    port: hotPort
  }
} = config

export default {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${hotHost}:${hotPort}`,
    'webpack/hot/dev-server',
    `${__dirname}/src/root.js`
  ],
  output: {
    path: `${__dirname}/public/`,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(scss|sass|css)$/,
        loader: 'style-loader!css-loader!sass-loader?cacheDirectory'
      }
    ]
  },
  plugins: [
    HotModuleReplacementPlugin,
    NoErrorsPlugin
  ]
}
