const db = require("../models");

//////////////////////////////////////////////////////////////////////////////////
// @desc      Récupérer tous les posts avec leurs commentaires et likes associés
// @route     GET /api/posts/
//////////////////////////////////////////////////////////////////////////////////

exports.getAll = (req, res) => {
  db.Post.findAll({
    where: { parent_post_id: null },
    include: [
      {
        model: db.Post,
        as: "Comments",
        include: {
          model: db.User,
          attributes: ["firstName", "lastName", "imageUrl"],
          as: "Creator",
        },
      },
      {
        model: db.User,
        attributes: ["firstName", "lastName"],
        as: "Likes",
      },
      {
        model: db.User,
        attributes: ["firstName", "lastName", "imageUrl"],
        as: "Creator",
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
// @desc      Récupérer un post avec ses commentaires et likes ou un commentaire seul avec ses likes
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
        as: "Comments",
        include: {
          model: db.User,
          attributes: ["firstName", "lastName", "imageUrl"],
          as: "Creator",
        },
      },
      {
        model: db.User,
        attributes: ["firstName", "lastName"],
        as: "Likes",
      },
      {
        model: db.User,
        attributes: ["firstName", "lastName", "imageUrl"],
        as: "Creator",
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
  let postObject = {
    user_id: req.body.user_id,
    content: req.body.content,
    parent_post_id: req.body.parent_post_id,
  };

  // ajout d'une image si le user en upload une
  if (req.hasOwnProperty("file")) {
    postObject = {
      ...postObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
  }

  db.Post.create(postObject)
    .then((post) => res.status(201).send(post))
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
