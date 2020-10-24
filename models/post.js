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
      onDelete: "cascade",
    });
    Post.belongsToMany(models.User, {
      as: "post_id",
      through: "Likes",
      onDelete: "CASCADE",
    });
  };

  return Post;
};
