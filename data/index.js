const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
const jwt = require('jsonwebtoken')

server.use(middlewares)

server.use(jsonServer.bodyParser)

const _username = "Admin"
const _password = "12345"
const secret = "qwer1234"


server.post('/api/v1/auth/login', (req, res) => {
  const { username, password } = req.body

  if (username !== _username && password !== _password) {
    res.status(400).json({
      status: 400,
      message: "Имя пользователя или пароль введены не верно"
    })
  }
  const token = jwt.sign({ username, password }, secret)

  res.json({ token })
})

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})