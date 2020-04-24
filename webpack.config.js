const path = require('path');

module.exports = {
  context: __dirname,
  entry: './typescript/index.ts',
  output: {
    path: path.resolve(__dirname, 'inst', 'js'),
    filename: 'bundle.js',
    publicPath: '/dist/js/',
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // expression for all files ending in .ts
        exclude: /node_modules(?!\/rxjs)/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
