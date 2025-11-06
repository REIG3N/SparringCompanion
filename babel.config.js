module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@styles': './src/styles',
            '@components': './src/components',
            '@screens': './src/screens',
            '@utils': './utils',
            '@constants': './constants',
            '@': './',
          },
          extensions: [
            '.ios.js',
            '.android.js',
            '.web.js',
            '.js',
            '.ts',
            '.tsx',
            '.json',
          ],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};


