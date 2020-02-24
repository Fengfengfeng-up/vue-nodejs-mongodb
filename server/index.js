const express = require('express')

const app = express()

app.set('secret', 'fhnioewnfjkndskf4f64') // 设定密钥

app.use(require('cors')()) // 解决跨域请求
app.use(express.json()) // 处理json数据
app.use('/uploads', express.static(__dirname + '/uploads')) // 静态资源管理
app.use('/admin', express.static(__dirname + '/admin')) // 静态资源管理
app.use('/', express.static(__dirname + '/web')) // 静态资源管理


require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen('3000', () => {
  console.log('http://localhost:3000')
})