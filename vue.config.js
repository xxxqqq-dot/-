module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      proxy: {
        '/proxy': {
          target: 'http://localhost:3000/',
          changeOrigin: true, //如果接口跨域，需要进行这个参数配置
          ws: true, //proxy websockets
          pathRewrite: {
            '^/proxy':''
          }
        }
      }
    }
  } 


}