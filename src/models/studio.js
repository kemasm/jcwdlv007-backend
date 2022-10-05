const { DataTypes } = require("sequelize");

const Studio = (sequelize) => {
  return sequelize.define("Studio", {
    studio_name: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};

module.exports = Studio;
