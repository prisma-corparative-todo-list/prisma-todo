const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join, resolve } = require('path');

module.exports = {
  output: {
    path: join(__dirname, 'dist/apps/api'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      compiler: 'tsc',
      target: 'node',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      compilerOption: {
        deleteOutDi: true,
        assets: ['src/app/mailtemplates/**/*'], // "**/*.ejs" all files ending with .ejs
        watchAsset: true, // copy assets in watch mode
      },
    }),
  ],
};
