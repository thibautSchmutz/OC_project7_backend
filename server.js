const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

// chargement des variables d'environnement
dotenv.config({ path: "./config/.env" });

const db = require("./models");
const PORT = process.env.PORT || 5000;

// Ajout des paramètres de securités au headers des responses (contient une méthode xssFilter()).
app.use(helmet());

// Gestion des CORS (ouvert sur toutes les routes)
app.use(cors());

// Formats de requête acceptée
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Création d'un dossier statique pour la gestion des images
app.use("/images", express.static(path.join(__dirname, "images")));

// routes
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);
const postRoutes = require("./routes/post");
app.use("/api/posts", postRoutes);
const likeRoutes = require("./routes/like");
app.use("/api/likes", likeRoutes);

db.sequelize.sync().then(() =>
  app.listen(PORT, () => {
    console.log(`Listening on port : http://localhost:${PORT}`);
  })
);
