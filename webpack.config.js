const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/ts/main.ts',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      assetModuleFilename: 'assets/[name].[hash:8][ext]',
      clean: true,
    },

    resolve: {
      extensions: ['.ts', '.js'],
    },

    devtool: isProd ? false : 'eval-source-map',

    module: {
      rules: [
        // TypeScript
        { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },

        // CSS: @import and url() are resolved by css-loader, then extracted to a real .css file
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },

        // <img src>, <link rel="icon"> in HTML are turned into bundled assets
        { test: /\.html$/, loader: 'html-loader' },

        // Images and SVGs (photos, icons, torn-paper edges, doodles)
        { test: /\.(png|jpe?g|webp|svg)$/i, type: 'asset/resource' },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      }),
    ],

    optimization: {
      minimizer: ['...', new CssMinimizerPlugin()],
    },

    devServer: {
      static: { directory: path.resolve(__dirname, 'dist') },
      port: 3000,
      open: true,
      hot: true,
    },
  };
};
