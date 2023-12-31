// Imports
const express = require("express");
const multer = require("multer");

// Functions / variables
const router = express.Router();
const userController = require("./controllers/UserController");
const UserController = require("./controllers/UserController");
const verifyJWT = require('./middlewares/auth');
const storage = require('./middlewares/multerDiskStorage')

// Constants 
const upload = multer({ storage: storage });

router.get("/user/auth", verifyJWT, async (req, res) => {
  res.json({ user: req.userId });
});
router.get("/users", verifyJWT, userController.findAll);
router.get("/user", verifyJWT, userController.getUserById);
router.post("/user", UserController.register);
router.post("/login", UserController.login);
router.post("/upload", verifyJWT, upload.single("file"), userController.updateFilename);
router.get("/publications", UserController.getPublications); // FINALIZAR
router.put("/user", verifyJWT, UserController.update);
router.delete("/user/:id", UserController.delete);

module.exports = router;
