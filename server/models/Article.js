const mongoose = require('mongoose')

// 新闻资讯模型
const schema = new mongoose.Schema({
  title: { type: String }, // 标题
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 所属类型
  body: { type: String } // 内容
},{
  timestamps: true // 带上时间戳
})

module.exports = mongoose.model('Article', schema)