const express = require("express");

// Importation des méthodes du controller
const { signup } = require("../controllers/user");

// Déclaration du router express
const router = express.Router();

// Assignation des routes
router.post("/signup", signup);

// Exportation du module
module.exports = router;
