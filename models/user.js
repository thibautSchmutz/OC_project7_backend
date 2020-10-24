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
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue:
        "https://pixabay.com/get/57e6d4434f55af14f1dc8460da29317e163adaed525578_640.png",
    },
  });

  // Définition des associations
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "user_id",
      onDelete: "cascade",
    });
    User.belongsToMany(models.Post, {
      as: "user_id",
      through: "Likes",
      onDelete: "CASCADE",
    });
  };

  return User;
};
