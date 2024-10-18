/**
 * ./models/chatroom.js
 * 
 * 코드 작성자 : 안중원
 */

const Sequelize = require('sequelize');

module.exports = class ChatRoom extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'chatroom',
      tableName: 'chatrooms',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.ChatRoom.belongsTo(db.User, {
      foreignKey: 'buyerIdx', 
      sourceKey: 'id'
    });
    db.ChatRoom.belongsTo(db.Post, {
      foreignKey: 'postIdx', 
      sourceKey: 'id'
    });
    db.ChatRoom.hasMany(db.ChatMessage, {
      foreignKey: 'chatroomIdx', 
      sourceKey: 'id'
    });
  }
};
