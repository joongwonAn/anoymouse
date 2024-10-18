/**
 * ./models/sellinfo.js
 * 판매자가 들은 과목, 학점 등 
 * 
 * 코드 작성자 : 안중원
 */

const Sequelize = require('sequelize');

module.exports = class Sellinfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      subject: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      professor: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      grades: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      year: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      semester: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Sellinfo',
      tableName: 'sellinfo',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Sellinfo.belongsTo(db.User, { foreignKey: 'seller', sourceKey: 'id' });
    db.Sellinfo.belongsTo(db.Post, { foreignKey: 'postIdx', sourceKey: 'id' });
  }
};
