const express = require("express");
// const nocache = require("nocache");

// Importation des méthodes du controller
const { signup, login, deleteUser } = require("../controllers/user");

// Déclaration du router express
const router = express.Router();

// Assignation des routes
router.post("/signup", signup);
router.post("/login", login);
router.delete("/delete/:id", deleteUser);
// router.post("/login", login);

// Exportation du module
module.exports = router;
