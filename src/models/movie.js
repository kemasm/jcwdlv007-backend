const { DataTypes } = require("sequelize");

const Movie = (sequelize) => {
  return sequelize.define("Movie", {
    film_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year_released: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true,
    },
    img_src: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

module.exports = Movie;
