const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const pretty = require('express-prettify')
const { User} = require('./db.js')
const {register, login, validateRequestBody} = require("./func.js")
const { userRegisterSchema } = require("./validation.js")
const router = express.Router()
const session = require('express-session')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors({
   origin: process.env.FRONTEND_URL
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(pretty({ always: true }))
app.use('/api', router);

app.use(cookieParser());
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}))

router.post("/register", validateRequestBody(userRegisterSchema) ,async (req,res) => {
   const isRegister = await register(req.body)
   //if (isRegister && req.session)
   //   req.session.user = { email: req.body.email, password: req.body.password };
   res.send(isRegister);
})

router.post("/login", async (req, res) => {
   const isLogin = await login(req.body)
   //if (isLogin)
   //   req.session.user = { email: req.body.email, password: req.body.password }
   res.send(isLogin)
})
app.listen(process.env.PORT, () => {
   console.log(`App listening at http://localhost:${process.env.PORT}`)
})
