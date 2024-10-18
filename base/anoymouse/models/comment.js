/**
 * ./models/comment.js
 * 댓글
 * 
 * 코드 작성자 : 안중원
 */

const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
        comment: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        UserNick: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
   }
 
   static associate(db) {
     db.Comment.belongsTo(db.Post);
     db.Comment.belongsTo(db.User);
   }
};
 
 