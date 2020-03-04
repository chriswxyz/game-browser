module.exports = {
  stories: ['../src/**/*.story.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-knobs'],
  webpackFinal: async config => {
    // do mutation to the config

    config.module.rules.push({
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    });

    config.resolve.extensions.push('.tsx');
    config.resolve.extensions.push('.ts');

    return config;
  },
};
