// 资源中间件
module.exports = options => {
  return async (req, res, next) => { // 再处理请求
    // 中间件inflection，先处理
    // npm i inflection  inflection.classify( str ) 这里函数为每个字符串对象添加分类支持 
    // 通过inflection修改 动态参数resouce 指向找到对应 resource 的模型  这里把小写的复数形式转为大写的单数 例如: categories => Category
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`) // 给请求对象上挂载一个Model,让每个接口能够直接用对应的Model
    next()
  }
}