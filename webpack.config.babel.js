import { join } from 'path'

const include = join(__dirname, 'src')

export default {
  entry: './src/index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'imagecrop'
  },
  externals: {
    'jquery': 'jQuery'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', include},
      {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  }
}
