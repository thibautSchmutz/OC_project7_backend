const express = require("express");
// const nocache = require("nocache");

// Importation des méthodes du controller
const { getAll, getOne, createPost } = require("../controllers/post");

// Déclaration du router express
const router = express.Router();

// Assignation des routes
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/new", createPost);

// router.post("/login", login);

// Exportation du module
module.exports = router;
