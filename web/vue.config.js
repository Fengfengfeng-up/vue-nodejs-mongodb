module.exports = {
  outputDir: __dirname + '/../server/web', // 生成的dist直接放到server里的admin文件夹
  publicPath: process.env.NODE_ENV === 'production' 
    ? '/' // 如果不放到根路径，则修改成生成的静态文件路径
    : '/'
}