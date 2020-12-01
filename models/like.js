module.exports = (sequelize, DataTypes) => {
  // Définition de la table
  const Like = sequelize.define("like", {}, { timestamps: false });

  return Like;
};
