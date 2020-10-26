const express = require("express");

// Importation de middleware
const auth = require("../middlewares/auth");

// Importation des méthodes du controller
const { addLike, deleteLike } = require("../controllers/like");

// Déclaration du router express
const router = express.Router();

// Assignation des routes
router.post("/:postid/:userid/new", auth, addLike);
router.delete("/:postid/:userid/delete", auth, deleteLike);

// Exportation du module
module.exports = router;
