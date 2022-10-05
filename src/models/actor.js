const { DataTypes } = require("sequelize");

const Actor = (sequelize) => {
  return sequelize.define("Actor", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

module.exports = Actor;
