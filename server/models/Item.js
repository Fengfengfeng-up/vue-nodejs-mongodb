const mongoose = require('mongoose')

// 物品模型
const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String }
})

module.exports = mongoose.model('Item', schema)