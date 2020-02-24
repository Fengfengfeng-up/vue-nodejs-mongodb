const mongoose = require('mongoose')

// 分类模型
const schema = new mongoose.Schema({
  name: { type: String },
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}, // 类型不能为 string ,为 mongodb数据库里的id： mongoose.SchemaTypes.ObjectId 再关联本身这个模型 ref: 'Category'
})

// 虚拟关联子分类
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

// 虚拟关联文章
schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

// mongoose.model里第三个参数可省略，即集合名，mongodb会自动创建，会将模型名 Category 变为小写复数形式 categories
module.exports = mongoose.model('Category', schema) 