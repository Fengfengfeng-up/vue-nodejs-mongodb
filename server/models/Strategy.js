const mongoose = require('mongoose')

// 图文攻略模型
const schema = new mongoose.Schema({
  title: { type: String }, // 标题
  banner: { type: String }, // 大图
  href: { type: String }, // 跳转的链接
  date: { type: String }, // 发布日期
  categories: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' } // 所属类型
})

module.exports = mongoose.model('Strategy', schema, 'strategies')