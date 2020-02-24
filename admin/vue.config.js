module.exports = {
  outputDir: __dirname + '/../server/admin', // 生成的dist直接放到server里的admin文件夹
  publicPath: process.env.NODE_ENV === 'production' 
    ? '/admin/' // 如果不放到根路径，则修改生成的静态文件路径
    : '/'
}