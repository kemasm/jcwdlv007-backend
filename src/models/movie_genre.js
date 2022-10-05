const { DataTypes } = require("sequelize");

const Movie_Genre = (sequelize) => {
  return sequelize.define("Movie_Genre", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });
};

module.exports = Movie_Genre;
