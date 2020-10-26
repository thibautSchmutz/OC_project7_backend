const db = require("../models");

//////////////////////////////////////////////////////////////////////////////////
// @desc      Récupérer tous les posts et commentaires associés
// @route     GET /api/posts/
//////////////////////////////////////////////////////////////////////////////////

exports.getAll = (req, res) => {
  db.Post.findAll({
    where: { parent_post_id: null },
    include: [
      {
        model: db.Post,
      },
      {
        model: db.User,
        attributes: ["id"],
      },
    ],
    // {
    //   model: User,
    //   // through: { attributes: [Like] }
    // },
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
    include: [
      {
        model: db.Post,
      },
      {
        model: db.User,
        attributes: ["id"],
      },
    ],
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

//////////////////////////////////////////////////////////////////////////////////
// @desc      Modifier un post
// @route     PUT /api/posts/:id/update
//////////////////////////////////////////////////////////////////////////////////

exports.updatePost = (req, res) => {
  db.Post.update(
    {
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => res.send("post updated"))
    .catch((err) => console.log(err));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Suppression d'un post
// @route     DELETE /api/posts/:id/delete
//////////////////////////////////////////////////////////////////////////////////

exports.deletePost = (req, res) => {
  db.Post.destroy({
    where: { id: req.params.id },
  })
    .then(() => res.send("post deleted"))
    .catch((err) => console.log(err));
};
