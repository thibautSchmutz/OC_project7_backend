const express = require("express");
// const nocache = require("nocache");

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
router.get("/", getAll);
router.post("/new", createPost);
router.get("/:id", getOne);
router.put("/:id/update", updatePost);
router.delete("/:id/delete", deletePost);

// Exportation du module
module.exports = router;
