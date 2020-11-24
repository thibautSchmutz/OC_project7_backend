const express = require("express");

// importation de multer pour la gestion des images
const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");

// Importation des méthodes du controller
const {
  signup,
  login,
  deleteUser,
  getAll,
  getOne,
  getOneWithPosts,
  updateUser,
  updateUserPassword,
} = require("../controllers/user");

// Déclaration du router express
const router = express.Router();

// Assignation des routes
router.get("/", auth, getAll);
router.post("/signup", multer, signup);
router.post("/login", login);
router.get("/:id", auth, getOne);
router.get("/:id/complete", auth, getOneWithPosts);
router.put("/:id/update", auth, multer, updateUser);
router.put("/:id/update-password", auth, updateUserPassword);
router.delete("/:id/delete", auth, deleteUser);
// router.post("/login", login);

// Exportation du module
module.exports = router;
