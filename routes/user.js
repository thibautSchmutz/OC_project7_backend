const express = require("express");

// importation de multer pour la gestion des images
const multer = require("../middlewares/multer-config");

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
router.get("/", getAll);
router.post("/signup", multer, signup);
router.post("/login", login);
router.get("/:id", getOne);
router.get("/:id/complete", getOneWithPosts);
router.put("/:id/update", multer, updateUser);
router.put("/:id/update-password", updateUserPassword);
router.delete("/:id/delete", deleteUser);
// router.post("/login", login);

// Exportation du module
module.exports = router;
