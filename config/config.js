import { resolve } from 'path';

const config = {
  mode: 'site',
  title: 'CSS Guidebook',
  description: 'CSS 完全知识体系',
  base: '/black-css-guidebook/',
  publicPath: '/black-css-guidebook/',
  favicon: './favicon.ico',
  logo: 'http://img.mrsingsing.com/css-guidebook-favicon.png',
  alias: {
    '@example': resolve(__dirname, '../example')
  },
  hash: true,
  exportStatic: {},
  navs: [
    null,
    {
      title: 'Github',
      path: 'https://github.com/yyt520/black-css-guidebook',
    },
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
};

if (process.env.NODE_ENV !== 'development') {
  config.ssr = {};
}

export default config;
