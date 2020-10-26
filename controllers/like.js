const db = require("../models");

//////////////////////////////////////////////////////////////////////////////////
// @desc      Ajouter un Like
// @route     POST /api/likes/:postid/:userid/new
//////////////////////////////////////////////////////////////////////////////////

exports.addLike = (req, res) => {
  db.Like.create({
    post_id: req.params.postid,
    user_id: req.params.userid,
  })
    .then((like) => res.send("post liked"))
    .catch((err) => console.log(err));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Supprimer un Like
// @route     DELETE /api/likes/:postid/:userid/delete
//////////////////////////////////////////////////////////////////////////////////

exports.deleteLike = (req, res) => {
  db.Like.destroy({
    where: { post_id: req.params.postid },
    where: { user_id: req.params.userid },
  })
    .then(() => res.send("like deleted"))
    .catch((err) => console.log(err));
};
