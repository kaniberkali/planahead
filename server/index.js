const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const pretty = require('express-prettify')
const { User} = require('./db.js')
const {register, login, validateRequestBody, getUserByEmail} = require("./func.js")
const router = express.Router()
require('dotenv').config()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const config= require("./config.js")
const {userLoginSchema, userRegisterSchema} = require("./validation");

app.use(cors({
   origin: process.env.FRONTEND_URL
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(pretty({ always: true }))
app.use('/api', router);

function authenticateToken(req, res, next) {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   if (!token) {
      return res.sendStatus(401);
   }
   jwt.verify(token, config.jwt_secret, (err, user) => {
      if (err)
         return res.sendStatus(403);
      req.user = user;
      next();
   });
}

router.post("/register",validateRequestBody(userRegisterSchema), async (req,res) => {
   if ((await getUserByEmail(req.body.email)).length)
      return res.status(409).json({ message: 'Eposta adresi zaten alınmış' });
   const isRegister = await register(req.body)
   const token = jwt.sign({ id: isRegister.insertId }, config.jwt_secret)
   res.send({token})
})

router.post("/login", validateRequestBody(userLoginSchema),async (req, res) => {
   const isLogin = await login(req.body)
   if (isLogin[0].id)
   {
      const token = jwt.sign({id: isLogin.id}, config.jwt_secret);
      res.send({token})
   }
   else
      res.status(401).json({ message: 'Yanlış eposta adresi veya şifre' });
})
router.get("/session", authenticateToken, async (req,res) => {
   res.json(req.user)
})
app.listen(process.env.PORT, () => {
   console.log(`App listening at http://localhost:${process.env.PORT}`)
})
