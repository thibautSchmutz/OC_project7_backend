const db = require("../models");

//////////////////////////////////////////////////////////////////////////////////
// @desc      Récupérer tous les posts et commentaires associés
// @route     GET /api/posts/
//////////////////////////////////////////////////////////////////////////////////

exports.getAll = (req, res) => {
  db.Post.findAll({
    where: { parent_post_id: null },
    include: db.Post,
  })
    .then((posts) => res.send(posts))
    .catch((err) => console.log(err));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Récupérer un post avec ses commentaires
// @route     GET /api/posts/:id
//////////////////////////////////////////////////////////////////////////////////

exports.getOne = (req, res) => {
  db.Post.findAll({
    where: {
      id: req.params.id,
    },
    include: db.Post,
  })
    .then((post) => res.send(post))
    .catch((err) => console.log(err));

  // db.Post.findByPk(req.params.id)
  //   .then((post) => res.send(post))
  //   .catch((err) => console.log(err));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Créer un nouveau Post ou commentaire
// @route     POST /api/posts/new
//////////////////////////////////////////////////////////////////////////////////

exports.createPost = (req, res) => {
  db.Post.create({
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    user_id: req.body.user_id,
    parent_post_id: req.body.parent_post_id,
  })
    .then((post) => res.send(post))
    .catch((err) => console.log(err));
};
