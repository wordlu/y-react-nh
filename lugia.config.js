import { join, resolve } from 'path';
import megaDesktopConfig from './config/mega.desktop.config.json';
const NODE_ENV = process.env.NODE_ENV;
const ProjectName = 'abcAnalysis';
process.env.COMPRESS = 'none';
export default {
  hash: false,
  disableCSSModules: true,
  cssModulesWithAffix: true,
  entry: './src/index.js',
  publicPath: NODE_ENV === 'development' ? '/' : `/${ProjectName}/`, //开发环境
  // publicPath: 'http://localhost:30440/', // 本地和portal联调
  alias: {
    '@': join(__dirname, './src'),
    '@components': join(__dirname, './src/components'),
    '@utils': join(__dirname, './src/utils'),
    '@services': join(__dirname, './src/services'),
    '@pages': join(__dirname, './src/pages'),
    '@models': join(__dirname, './src/models'),
  },
  dllDependenciesExcludes: [],
  extraBabelIncludes: [/decamelize/],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@lugia/lugia-web',
        libraryDirectory: 'dist',
      },
      '@lugia/lugia-web',
    ],
    [
      'import',
      {
        libraryName: '@lugia/lugia-grid',
        libraryDirectory: 'dist',
      },
      '@lugia/lugia-grid',
    ],
    [
      'import',
      {
        libraryName: '@ysstech-data/data-web',
        libraryDirectory: 'dist',
      },
      '@ysstech-data/data-web',
    ],
  ],
  applyWebpack(webpackConfig, { webpack, merge }) {
    return {
      ...webpackConfig,
      watchOptions: {
        ignored: [/node_modules\/(?!@ysstech-data\/.+)/, /\@ysstech-data\/.+\/node_modules/],
      },
      output: {
        ...webpackConfig.output,
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        library: `${ProjectName}`,
        libraryTarget: 'window',
      },
    };
  },
  generator(api) {
    const {
      appPath,
      pkg: { version },
    } = api.getApp();
    const verbose = api.isVerbose();
    const { fs, mergeObj } = api._utils();

    fs.writeJSONSync(
      join(appPath, './config/mega.desktop.config.json'),
      mergeObj(megaDesktopConfig, {
        extraMega: {
          engines: {
            scaffolding: { version },
          },
        },
      }),
      {
        spaces: 2,
      }
    );

    if (verbose) {
      console.log(
        `update scaffolding(${megaDesktopConfig.extraMega.engines.scaffolding.name}) version: ${version}`
      );
    }

    api.mergePackage(pkg => {
      delete pkg.files;
      return {
        ...pkg,
        version: '1.0.0',
        private: true,
      };
    });
  },
  ...megaDesktopConfig,
  proxy: {
    // 暂时停用
    '/yapi/api/abcAnalysis': {
      // target: 'http://172.20.10.5:8080/', // zr
      target: 'http://192.168.102.168:31000/', // 测试地址
      // target: 'http://192.168.102.153:31000/', //客户线上地址
      changeOrigin: true,
      pathRewrite: {
        '^/yapi/api/abcAnalysis': '',
      },
    },
    // 基础服务
    '/abc/api/baseFunction': {
      // target: 'http://172.20.10.5:8080/', // zr
      target: 'http://192.168.102.168:32000/', // 测试地址
      // target: 'http://192.168.102.153:31000/', //客户线上地址
      changeOrigin: true,
      pathRewrite: {
        '^/abc/api/baseFunction': '',
      },
    },
    // 债券风险预警
    '/abc/api/bondWarning': {
      // target: 'http://172.20.10.5:8080/', // zr
      target: 'http://192.168.102.168:32002/', // 测试地址
      // target: 'http://192.168.102.153:31000/', //客户线上地址
      changeOrigin: true,
      pathRewrite: {
        '^/abc/api/bondWarning': '',
      },
    },
    // 融资回购
    '/abc/api/financingRepurchase': {
      // target: 'http://172.20.10.5:8080/', // zr
      target: 'http://192.168.102.168:32001/', // 测试地址
      // target: 'http://192.168.102.153:31000/', //客户线上地址
      changeOrigin: true,
      pathRewrite: {
        '^/abc/api/financingRepurchase': '',
      },
    },
    '/smartbi': {
      // target: 'http://219.141.235.67:16001/', // smartbi
      target: 'http://192.168.253.1:30440/', // csl
      changeOrigin: true,
      pathRewrite: {
        '^/smartbi': '/smartbi',
      },
    },
  },
};
