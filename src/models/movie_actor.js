const { DataTypes } = require("sequelize");

const Movie_Actor = (sequelize) => {
  return sequelize.define("Movie_Actor", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });
};

module.exports = Movie_Actor;
