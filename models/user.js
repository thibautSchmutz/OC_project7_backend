module.exports = (sequelize, DataTypes) => {
  // Définition de la table et des colonnes
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue:
        "http://localhost:5000/images/Photo-profil-générique.png1605702446100.png",
    },
  });

  // Définition des associations
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "user_id",
      allowNull: false,
      onDelete: "CASCADE",
    });
    User.belongsToMany(models.Post, {
      foreignKey: "like_user_id",
      allowNull: false,
      through: models.like,
    });
  };

  return User;
};
