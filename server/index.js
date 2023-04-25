const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pretty = require('express-prettify');
const { User} = require('./db.js');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(pretty({ always: true }))
require('dotenv').config()
app.use("/api", (req,res) => {
   res.send(process.env);
})
(async () => {
   const users = await User.findAll();
   console.log(users)
})()
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))