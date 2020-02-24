const mongoose = require('mongoose')

// 精彩视频模型
const schema = new mongoose.Schema({
  title: { type: String }, // 标题
  categories: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }, // 所属类型 
  href: { type: String },
  banner: { type: String },
  count: { type: String },
  date: { type: String }
})

module.exports = mongoose.model('Video', schema, 'videos')