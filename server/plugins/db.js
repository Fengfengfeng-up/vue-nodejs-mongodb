module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://127.0.0.1:27017/gloryofkings', {
    useNewUrlParser: true
  })

  // 通过 require-all 插件引用 models 文件下的所有 模型
  require('require-all')(__dirname + '/../models') 
}