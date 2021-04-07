const path = require('path');

module.exports = {
  entry: './src/Main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        exclude: /(bower_components)/,
        use: 'ts-loader',
        include: __dirname,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};