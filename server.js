const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");

// chargement des variables d'environnement
dotenv.config({ path: "./config/.env" });

const db = require("./models");
const PORT = process.env.PORT || 5000;

// Ajout des paramètres de securités au headers des responses (contient une méthode xssFilter()).
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
