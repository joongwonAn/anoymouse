/**
 * ./models/chatmessage.js
 * 
 * 코드 작성자 : 안중원
 */

const Sequelize = require('sequelize');

module.exports = class ChatMessage extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      chatMessage: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      readOrNot: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'chatmessage',
      tableName: 'chatmessages',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.ChatMessage.belongsTo(db.User, {
      foreignKey: 'sellerIdx', 
      sourceKey: 'id'
    });
    db.ChatMessage.belongsTo(db.ChatRoom, {
      foreignKey: 'chatroomIdx', 
      sourceKey: 'id'
    });
  }
};
