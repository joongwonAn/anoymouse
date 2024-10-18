/**
 * ./models/post.js
 * 게시글
 * 
 * 코드 작성자 : 안중원
 */

const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      isbn: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      postTitle: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      postContent: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      postPrice: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      postStatus: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      viewCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      chatCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasOne(db.Sellinfo, { foreignKey: 'postIdx', sourceKey: 'id' });
    db.Post.hasOne(db.Bookinfo, { foreignKey: 'postIdx', sourceKey: 'id' });
    db.Post.hasMany(db.Favorite, { foreignKey: 'postIdx', sourceKey: 'id' });
    db.Post.hasMany(db.Review, {
      foreignKey: 'postIdx',
      sourceKey: 'id',
      allowNull: true,
    });
    db.Post.hasMany(db.ChatRoom, {
      foreignKey: 'postIdx',
      sourceKey: 'id',
      allowNull: true,
    });
  }
};