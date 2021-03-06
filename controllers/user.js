const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////////////////////////////////
// @desc      Récupérer tous les utilisateurs
// @route     GET /api/users/
//////////////////////////////////////////////////////////////////////////////////

exports.getAll = (req, res) => {
  db.User.findAll()
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Récupérer un utilisateur
// @route     GET /api/users/:id
//////////////////////////////////////////////////////////////////////////////////

exports.getOne = (req, res) => {
  db.User.findByPk(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Récupérer un utilisateur + ses posts
// @route     GET /api/users/:id/complete
//////////////////////////////////////////////////////////////////////////////////

exports.getOneWithPosts = (req, res) => {
  db.User.findAll({
    where: { id: req.params.id },
    include: [db.Post],
  })
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Création d'un nouvel utilisateur
// @route     POST /api/users/signup
//////////////////////////////////////////////////////////////////////////////////

exports.signup = (req, res) => {
  // vérification si l'utilisateur n'a pas déjà un compte (via l'email qui doit être unique)
  db.User.findAll({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user.length !== 0) {
        res.status(401).send("Adresse E-mail déjà utilisée");
      } else {
        // création de l'objet User et enregistrement en base
        bcrypt.hash(req.body.password, 6).then((hash) => {
          let userObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
          };

          // ajout d'une image si le user en upload une
          if (req.hasOwnProperty("file")) {
            userObject = {
              ...userObject,
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            };
          }

          db.User.create(userObject)
            .then((newUser) => res.status(201).send(newUser))
            .catch((err) => console.log(err));
        });
      }
    })
    .catch((err) => console.log(err));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Connexion d'un utilisateur
// @route     POST /api/users/login
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
        res.status(401).json("Utilisateur introuvable");
      }
      bcrypt
        .compare(req.body.password, user[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json("Mot de passe incorrect");
          }
          res.status(200).send({
            userId: user[0].id,
            token: jwt.sign(
              { userId: user[0].id },
              `${process.env.JWT_SECRET}`
            ),
          });
        })
        .catch((error) => res.status(500).json("error de JWT"));
    })
    .catch((error) => res.status(500).json("error Generale"));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Modifier le compte utilisateur (sauf mot de passe)
// @route     PUT /api/users/:id/update
//////////////////////////////////////////////////////////////////////////////////

exports.updateUser = (req, res) => {
  let userObject = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  // ajout d'une image si le user en upload une
  if (req.hasOwnProperty("file")) {
    userObject = {
      ...userObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
  }

  db.User.update(userObject, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      db.User.findByPk(req.params.id)
        .then((user) => res.send(user))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Modifier le mot de passe utilisateur
// @route     PUT /api/users/:id/update-password
//////////////////////////////////////////////////////////////////////////////////

exports.updateUserPassword = (req, res) => {
  // Vérfier le mot de passe actuel
  db.User.findAll({
    where: {
      id: req.params.id,
    },
    attributes: ["password"],
  })
    .then((user) => {
      if (user.length === 0) {
        res.status(401).json("Utilisateur introuvable");
      }
      bcrypt
        .compare(req.body.password, user[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json("Mot de passe incorrect");
          }
          // hasher le nouveau mot de passe
          bcrypt.hash(req.body.newPassword, 6).then((hash) => {
            // enregistrer en base de nouveau mot de passe
            db.User.update(
              {
                password: hash,
              },
              { where: { id: req.params.id } }
            )
              .then((userUpdated) =>
                res.status(201).json("mot de passe modifié")
              )
              .catch((err) => console.log(err));
          });
        })
        .catch((error) => res.status(500).json("error de cryptage"));
    })
    .catch((error) => res.status(500).json("error Generale"));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Suppression d'un compte utilisateur
// @route     DELETE /api/users/:id/delete
//////////////////////////////////////////////////////////////////////////////////

exports.deleteUser = (req, res) => {
  db.Post.destroy({
    where: { user_id: req.params.id },
  })
    .then(() => {
      db.User.destroy({
        where: { id: req.params.id },
      })
        .then(() => res.status(204).json("user deleted"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
