'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        allowNull: false
      })
      models.Like.belongsTo(models.Post, {
        foreignKey: 'postId',
        allowNull: false
      })
    }
  };
  Like.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};