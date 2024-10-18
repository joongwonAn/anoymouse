/**
 * ./models/review.js
 * 리뷰
 * 
 * 코드 작성자 : 안중원
 */

const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      reviewMessage: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'review',
      tableName: 'reviews',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Review.belongsTo(db.User, {
      foreignKey: 'userIdx', 
      sourceKey: 'id'
    });
    db.Review.belongsTo(db.Post, {
      foreignKey: 'postIdx', 
      sourceKey: 'id'
    });
  }
};
