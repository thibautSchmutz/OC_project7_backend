const express = require("express");
// const nocache = require("nocache");

// Importation des méthodes du controller
const { addLike, deleteLike } = require("../controllers/like");

// Déclaration du router express
const router = express.Router();

// Assignation des routes
router.post("/:postid/:userid/new", addLike);
router.delete("/:postid/:userid/delete", deleteLike);

// Exportation du module
module.exports = router;
