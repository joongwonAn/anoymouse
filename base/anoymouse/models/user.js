/**
 * ./models/user.js
 * 사용자
 * 
 * 코드 작성자 : 안중원
 */

const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.STRING(45),
        allowNull: true,
        unique: true,
      },
      userPw: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      userName: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      userNickname: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      university: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      department: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    // db.User.belongsToMany(db.Post, { through: "favorites" });
    db.User.hasOne(db.Sellinfo, { foreignKey: 'seller', sourceKey: 'id' });
    db.User.hasMany(db.Favorite, { foreignKey: 'userIdx', sourceKey: 'id' });
    db.User.hasMany(db.ChatRoom, {
      foreignKey: 'buyerIdx',
      sourceKey: 'id',
      allowNull: true,
    });
    db.User.hasMany(db.ChatMessage, {
      foreignKey: 'sellerIdx',
      sourceKey: 'id',
      allowNull: true,
    });
  }
};
