const express = require("express");

// Importation de middleware
const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");

// Importation des méthodes du controller
const {
  getAll,
  getOne,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/post");

// Déclaration du router express
const router = express.Router();

// Assignation des routes
router.get("/", auth, getAll);
router.post("/new", auth, multer, createPost);
router.get("/:id", auth, getOne);
router.put("/:id/update", auth, updatePost);
router.delete("/:id/delete", auth, deletePost);

// Exportation du module
module.exports = router;
