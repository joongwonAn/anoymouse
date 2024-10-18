/**
 * ./models/bookinfo.js
 * 책 정보 저장
 * 
 * 코드 작성자 : 안중원
 */

const Sequelize = require('sequelize');

module.exports = class Bookinfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(50)
      },
      author: {
        type: Sequelize.STRING(50),
      },
      price:{
        type: Sequelize.INTEGER
      },
      publisher:{
        type: Sequelize.STRING(50)
      },
      ISBN: {
        type: Sequelize.INTEGER
      },
      
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Bookinfo',
      tableName: 'bookinfos',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Bookinfo.belongsTo(db.Post, { foreignKey: 'postIdx', sourceKey: 'id' });
  }
};
