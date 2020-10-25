const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////////////////////////////////
// @desc      Inscription d'un nouvel utilisateur
// @route     POST /api/users/signup
// @access    Public
//////////////////////////////////////////////////////////////////////////////////

exports.signup = (req, res) => {
  // vérification si l'utilisateur n'a pas déjà un compte (via l'email qui doit être unique)
  db.User.findAll({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user.length !== 0) {
        res.status(401).send("Ce compte existe déjà");
      } else {
        // création de l'objet User et enregistrement en base
        bcrypt.hash(req.body.password, 6).then((hash) => {
          db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            imageUrl: req.body.imageUrl,
          })
            .then((newUser) => res.status(201).send(newUser))
            .catch((err) => console.log(err));
        });
      }
    })
    .catch((err) => console.log(err));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Connexion d'un utilisateur
// @route     POST /api/auth/login
// @access    Public
//////////////////////////////////////////////////////////////////////////////////

exports.login = (req, res) => {
  db.User.findAll({
    where: {
      email: req.body.email,
    },
    attributes: ["id", "password"],
  })
    .then((user) => {
      if (user.length === 0) {
        res.status(401).send("Utilisateur introuvable");
      }
      bcrypt
        .compare(req.body.password, user[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send("Mot de passe incorrect");
          }
          res.status(200).send({
            userId: user[0].id,
            token: jwt.sign(
              { userId: user[0].id },
              `${process.env.JWT_SECRET}`,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).send("error de JWT"));
    })
    .catch((error) => res.status(500).json("error Generale"));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Suppression d'un compte utilisateur
// @route     DELETE /api/users/delete/:id
// @access    Authorized (propriétaire du compte ou administrateur)
//////////////////////////////////////////////////////////////////////////////////

exports.deleteUser = (req, res) => {
  db.User.destroy({
    where: { id: req.params.id },
  })
    .then(() => res.send("user deleted"))
    .catch((err) => console.log(err));
};
