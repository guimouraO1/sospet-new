const express = require("express");
const router = express.Router();
const userController = require("./controllers/UserController");
const UserController = require("./controllers/UserController");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "/xampp/htdocs/loginPage/backend/upload/" + req.userId;
    // Verifica se o diretório já existe
    if (!fs.existsSync(uploadPath)) {
      // Se não existir, cria o diretório
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const SECRET = process.env.SECRET;

router.get("/user/auth", verifyJWT, async (req, res) => {
  res.json({ user: req.userId });
});

router.post("/upload", verifyJWT, upload.single("file"), (req, res) => {
  res.json(req.file.originalname);
});

router.get("/users", userController.findAll);
router.get("/user", verifyJWT, userController.getUserById);
router.post("/user", UserController.register);
router.post("/login", UserController.login);
router.put("/user", verifyJWT, UserController.update);
router.delete("/user/:id", UserController.delete);

async function verifyJWT(req, res, next) {
  const token = req.headers["authorization"];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "inválid token" }).end();
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = router;
