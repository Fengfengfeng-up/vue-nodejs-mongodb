const mongoose = require('mongoose')

// 英雄模型
const schema = new mongoose.Schema({
  name: { type: String }, // 名字
  avatar: { type: String }, // 头像
  banner: { type: String }, // 详情背景图
  title: { type: String }, // 称号
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 英雄类型
  scores: { // 英雄属性
    difficult: {type: Number}, // 难度
    skills: {type: Number}, // 技能
    attack: {type: Number}, // 攻击力
    survive: {type: Number}, // 生存
  },
  skills: [{ // 英雄技能
    icon: { type: String }, // 图标
    name: { type: String }, // 技能名称
    delay: { type: String }, // 冷却
    cost: { type: String }, // 消耗
    description: { type: String }, // 技能描述
    tips: { type: String } // 小提示
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 顺风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 逆风出装
  usageTips: { type: String }, // 使用技巧
  battleTips: { type: String }, // 对抗技巧
  teamTips: { type: String }, // 团战思路
  partners: [{  // 最佳搭档
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' }, // 最佳搭档
    description: { type: String }, // 相关描述
  }],
  restrained: [{ // 被谁克制
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }, // 相关描述
  }],
  restrain: [{ // 克制谁
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' }, 
    description: { type: String }, // 相关描述
  }],
  moreTips: [{ // 进阶攻略
    href: { type: String }, // 视频地址
    title: { type: String }, // 标题
    banner: { type: String}, // 视频背景图
    count: { type: String }, // 播放量
    date: { type: String } // 发布日期
  }]

})

module.exports = mongoose.model('Hero', schema, 'heroes')