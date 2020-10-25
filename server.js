const express = require("express");
const app = express();
const dotenv = require("dotenv");

const db = require("./models");
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

db.sequelize.sync().then(() =>
  app.listen(PORT, () => {
    console.log(`Listening on port : http://localhost:${PORT}`);
  })
);
