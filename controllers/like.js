const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//////////////////////////////////////////////////////////////////////////////////
// @desc      Ajouter un Like
// @route     POST /api/likes/:postid/:userid/new
//////////////////////////////////////////////////////////////////////////////////

exports.addLike = (req, res) => {
  db.like
    .create({
      like_post_id: req.params.postid,
      like_user_id: req.params.userid,
    })
    .then((like) => res.json("post liked"))
    .catch((err) => console.log(err));
};

//////////////////////////////////////////////////////////////////////////////////
// @desc      Supprimer un Like
// @route     DELETE /api/likes/:postid/:userid/delete
//////////////////////////////////////////////////////////////////////////////////

exports.deleteLike = (req, res) => {
  db.like
    .destroy({
      where: {
        [Op.and]: [
          { like_post_id: req.params.postid },
          { like_user_id: req.params.userid },
        ],
      },
    })
    .then(() => res.json("like deleted"))
    .catch((err) => console.log(err));
};
