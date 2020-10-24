const db = require("../models");
const bcrypt = require("bcryptjs");

// @desc      Inscription d'un nouvel utilisateur
// @route     POST /api/auth/signup
// @access    Public
exports.signup = (req, res) => {
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
};
