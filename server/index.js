const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pretty = require('express-prettify');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(pretty({ always: true }));
require('dotenv').config()
app.use("/api", (req,res) => {
   res.send(process.env);
});

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));