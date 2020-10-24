const db = require("../models");

// @desc      Inscription d'un nouvel utilisateur
// @route     POST /api/auth/signup
// @access    Public
exports.signup = (req, res) => {
  db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    imageUrl: req.body.imageUrl,
  }).then((newUser) => res.send(newUser));
};
