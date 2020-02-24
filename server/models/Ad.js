const mongoose = require('mongoose')

// 广告位模型
const schema = new mongoose.Schema({
  name: { type: String },  // 名称
  items: [{  // 广告资源 
    image: { type: String }, // 图片
    url: { type: String } // 点击图片跳转的地址
  }]
})

module.exports = mongoose.model('Ad', schema)