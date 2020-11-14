module.exports = (sequelize, DataTypes) => {
  // Définition de la table et des colonnes
  const Post = sequelize.define("Post", {
    content: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
    imageUrl: DataTypes.STRING,
  });

  // Définition des associations
  Post.associate = (models) => {
    Post.hasMany(models.Post, {
      foreignKey: "parent_post_id",
      onDelete: "CASCADE",
      as: "Comments",
    });
    Post.belongsToMany(models.User, {
      foreignKey: "like_post_id",
      allowNull: false,
      through: models.Like,
      as: "Likes",
    });
    Post.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "Creator",
    });
  };

  return Post;
};
