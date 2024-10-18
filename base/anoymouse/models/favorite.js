/**
 * ./models/favorite.js
 * 관심
 * 
 * 코드 작성자 : 안중원
 */

const Sequelize = require('sequelize');

module.exports = class Favorite extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'favorite',
      tableName: 'favorites',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Favorite.belongsTo(db.User, { foreignKey: 'userIdx', sourceKey: 'id' });
    db.Favorite.belongsTo(db.Post, { foreignKey: 'postIdx', sourceKey: 'id' });
  }
};
