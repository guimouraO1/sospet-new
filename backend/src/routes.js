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
router.put("/user", verifyJWT, UserController.update);
router.delete("/user/:id", UserController.delete);

router.get("/publications", UserController.getPublications); // FINALIZAR
router.get("/userPublications", verifyJWT, UserController.getUserPublications); // FINALIZAR

router.post("/publication", verifyJWT, UserController.postPublication); // FINALIZAR
router.post("/uploadPet", verifyJWT, upload.single("file"), async (req, res) => {
  res.json({ true: true });
});

module.exports = router;
