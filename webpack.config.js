const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].bundle.js',
    // publicPath: "/manage/", //for Deployed version
    // publicPath: '/my-account/' // for Deployed version
    publicPath: '/' //for Local
  },
  node: {
    __dirname: true
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource'
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },

  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@enums': path.resolve(__dirname, './src/common/enums'),
      '@http': path.resolve(__dirname, './src/http'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@sagas': path.resolve(__dirname, './src/sagas'),
      '@styles': path.resolve(__dirname, './src/common/styles'),
      '@types': path.resolve(__dirname, './src/common/types'),
      '@utils': path.resolve(__dirname, './src/common/utils'),
      '@images': path.resolve(__dirname, './src/assets/images')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '']
  },

  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    static: { directory: path.join(__dirname, 'public') },
    port: 8080
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv()
  ]
}
