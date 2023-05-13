const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const pretty = require('express-prettify')
const { User} = require('./db.js')
const {register, login, validateRequestBody, getUserByEmail, getNotes, getNote, addNote, deleteNote, editProfile, updateNote, edit} = require("./func.js")
const router = express.Router()
require('dotenv').config()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const config= require("./config.js")
const {userLoginSchema, userRegisterSchema, noteSchema} = require("./validation");
const multer = require("multer")

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
      cb(null, Math.floor(Math.random() * 999999999999) + "." + file.originalname.split('.')[1])
   }
});

const fileFilter = function(req, file, cb) {
   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true);
   } else {
      cb(new Error('Sadece resim dosyaları yüklenebilir!'), false);
   }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
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
   if ((await getUserByEmail(req.body.email)))
      return res.status(409).json({ message: 'Eposta adresi zaten alınmış' });
   await register(req.body)
   const token = jwt.sign({ "login":(await getUserByEmail(req.body.email)) }, config.jwt_secret)
   res.send({token})
})

router.post("/login", validateRequestBody(userLoginSchema),async (req, res) => {
   const isLogin = await login(req.body)
   if (isLogin)
   {
      const token = jwt.sign({"login":isLogin}, config.jwt_secret);
      res.send({token})
   }
   else
      res.status(401).json({ message: 'Yanlış eposta adresi veya şifre' });
})
router.get("/session", authenticateToken, async (req,res) => {
   res.json({"login":req.user})
})

router.post('/edit', authenticateToken, upload.single('image'), async function (req, res) {
   res.send(await editProfile(req))
});

router.put('/edit', authenticateToken, async function (req, res) {
   res.send(await edit(req))
});
router.post("/notes", authenticateToken, async (req, res) => {
   req.body.create_date=new Date().toLocaleString()
   res.send(await addNote(req))
})

router.get("/notes", authenticateToken, async (req, res) => {
   res.send(await getNotes(req))
})

router.get("/notes/:id", authenticateToken, async (req, res) => {
   res.send(await getNote(req))
})

router.delete("/notes/:id", authenticateToken, async (req, res) => {
   res.send(await deleteNote(req))
})

router.put("/notes/:id", authenticateToken, async (req, res) => {
   res.send(await updateNote(req))
})
app.listen(process.env.PORT, () => {
   console.log(`App listening at http://localhost:${process.env.PORT}`)
})
