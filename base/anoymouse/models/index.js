/**
 * ./models/index.js
 * 
 * 코드 작성자 : 안중원
 */

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Favorite = require('./favorite');
const Sellinfo = require('./sellinfo');
const Review = require('./review');
const ChatRoom = require('./chatroom');
const ChatMessage = require('./chatmessage');
const Bookinfo = require('./bookinfo');
const Comment = require('./comment');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Favorite = Favorite;
db.Sellinfo = Sellinfo;
db.Review = Review;
db.ChatRoom = ChatRoom;
db.ChatMessage = ChatMessage;
db.Bookinfo = Bookinfo;
db.Comment = Comment;

User.init(sequelize);
Post.init(sequelize);
Favorite.init(sequelize);
Sellinfo.init(sequelize);
Review.init(sequelize);
ChatRoom.init(sequelize);
ChatMessage.init(sequelize);
Bookinfo.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Post.associate(db);
Favorite.associate(db);
Sellinfo.associate(db);
Review.associate(db);
ChatRoom.associate(db);
ChatMessage.associate(db);
Bookinfo.associate(db);
Comment.associate(db);

module.exports = db;
