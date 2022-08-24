const CompressionPlugin = require('compression-webpack-plugin');
const Timestamp = new Date().getTime();

module.exports = {
  // 公共路径
  publicPath: './',
  // 打包路径
  outputDir: 'dist',
  // 静态资源路径
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false, // 不需要生产环境的 source map 设置false（减小dist文件大小，加速构建）
  devServer: {
    proxy: {
      //代理跨域
      '/': {
        target: 'https://zkcg.zzdingyun.com/',
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】  //解决浏览器缓存

      filename: `./static/[name].${Timestamp}.js`,
      chunkFilename: `./static/[name].${Timestamp}.js`,
    },
    // externals: {
    //   vant: 'Vant',
    // },
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js$|\.html$|\.css$/, // 匹配文件名
        filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
        minRatio: 1, // 压缩率小于1才会压缩
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
      }),
    ],
  },
};
