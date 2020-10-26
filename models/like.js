module.exports = (sequelize, DataTypes) => {
  // Définition de la table
  const Like = sequelize.define("Like", {}, { timestamps: false });

  return Like;
};
