const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const pretty = require('express-prettify')
const { User} = require('./db.js')
const {register, login, validateRequestBody} = require("./func.js")
const { userRegisterSchema } = require("./validation.js")
const router = express.Router()
const session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(pretty({ always: true }))
require('dotenv').config()
app.use('/api', router);

app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: true
}))

router.post("/register", validateRequestBody(userRegisterSchema),async (req,res) => {
   const isRegister = await register(req.body)
   if (isRegister)
      req.session.user = { username: req.body.username, password: req.body.password };
   res.send(isRegister);
})

router.post("/login", async (req, res) => {
   const isLogin = await login(req.body)
   if (isLogin)
      req.session.user = { username: req.body.username, password: req.body.password }
   res.send(isLogin)
})

router.get("/session",  (req, res) => {
   res.send(req.session.user)
})

router.get("/logout", (req, res) => {
   if (req.session.user) {
      req.session.destroy()
      res.send(true)
   }
   else
      res.send(false)
})

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))