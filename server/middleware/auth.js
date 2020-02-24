// 登录校验中间件
module.exports = options => {
  const jwt = require('jsonwebtoken') // jsonwebtoken 用于生成 token 验证token
  const assert = require('http-assert') // http-assert 用于判断值是否存在，没有就让node报错
  const AdminUser = require('../models/AdminUser') // 后台管理员模型

  return async (req, res, next) => {
    // 校验用户是否登录
    const token = String(req.headers.authorization || '').split(' ').pop() // 提取 token
    assert(token, 401, '请先登录') // 判断 token 是否存在，不存在则返回状态码 401 和 message '请先登录'
    const { id } = jwt.verify(token, req.app.get('secret')) // 如果验证成功提出 id
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id) // 在数据库中找到对应 id 的用户名并挂到 requst 请求对象上
    assert(req.user, 401, '请先登录')
    await next()
  }
}