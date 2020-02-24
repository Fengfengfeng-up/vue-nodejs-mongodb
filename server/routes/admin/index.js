module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken') // jsonwebtoken 用于生成 token 验证token
  const assert = require('http-assert') // http-assert 用于判断值是否存在，抛出错误
  const AdminUser = require('../../models/AdminUser') // 管理员模型
  const router = express.Router({
    mergeParams: true  // 合并路由里的参数使能够访问req.params.resource
  })
  

  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model) 
  })

  // 资源列表
  router.get('/', async (req, res) => {
    let queryOptions = {}
    if (req.Model.modelName === 'Category') { // 如果模型名是分类，加入parent类别并查出
      queryOptions.populate = 'parent' 
    }
    const items = await req.Model.find().setOptions(queryOptions) // .populate('parent') 并查找关联信息
    res.send(items) 
  })

  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model) 
  })

  // 修改资源
  router.put('/:id', async (req, res) => {
    //.findByIdAndUpdate(param1,param2) 通过ID查找并更新，param1: 被查找的id param2：更新内容
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model) 
  })

  // 删除资源
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  // 登录校验中间件
  const authMiddlware = require('../../middleware/auth')

  // 资源中间件
  const resourceMiddleware = require('../../middleware/resource')
  
  // 通过两个中间件匹配对应的接口
  app.use('/admin/api/rest/:resource',authMiddlware(), resourceMiddleware(), router)

  // 使用 multer 处理前端上传的文件
  // npm i multer
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' }) // 定义中间件将上传的文件传入 dest: __dirname + '/../../uploads' => 目标地址：绝对地址
  app.post('/admin/api/upload',authMiddlware(), upload.single('file'), async (req, res) => {
    const file = req.file // express本身没有 req.file 通过upload中间件将file加入req对象
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({username}).select('+password') // 查找用户名并取出密码
    assert(user, 422, '用户不存在') // 判断 user 是否存在，如果不存在返回状态码422，message:'用户不存在'
    /* if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    } */

    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    /* if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    } */

    // 3.返回token 使用 jsonwebtoken
    const token = jwt.sign({ id: user._id }, app.get('secret')) // 生成 token
    res.send({ token })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message : err.message
    })
  })
}