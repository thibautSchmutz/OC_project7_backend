const db = require("../models");

//////////////////////////////////////////////////////////////////////////////////
// @desc      Ajouter un Like
// @route     POST /api/likes/:postid/:userid/new
//////////////////////////////////////////////////////////////////////////////////

exports.addLike = (req, res) => {
  db.Like.create({
    like_post_id: req.params.postid,
    like_user_id: req.params.userid,
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
    where: { like_post_id: req.params.postid },
    where: { like_user_id: req.params.userid },
  })
    .then(() => res.send("like deleted"))
    .catch((err) => console.log(err));
};
