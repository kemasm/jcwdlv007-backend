const { DataTypes } = require("sequelize");

const Genre = (sequelize) => {
  return sequelize.define("Genre", {
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};

module.exports = Genre;
