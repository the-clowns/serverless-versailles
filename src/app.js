const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/', (req, res) => {
  console.log(req.body)
  res.json({
    message: 'ok'
  })
})

// Error handler
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send('Internal Serverless Error')
})

// Web 类型云函数，只能监听 9000 端口
app.listen(9000)
