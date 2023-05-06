const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const pretty = require('express-prettify')
const { User} = require('./db.js')
const {register, login} = require("./func.js")
const router = express.Router()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(pretty({ always: true }))
require('dotenv').config()
app.use('/api', router);

router.post("/register", (req,res) => {
   res.send(register(req.body));
})

router.post("/login", (req, res) => {
   res.send(login(req.body))
})
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))