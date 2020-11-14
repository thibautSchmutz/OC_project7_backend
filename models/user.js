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
        "https://pixabay.com/get/57e6d4434f55af14f1dc8460da29317e163adaed525578_640.png",
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
      foreignKey: "user_id",
      allowNull: false,
      through: models.Like,
    });
  };

  return User;
};
