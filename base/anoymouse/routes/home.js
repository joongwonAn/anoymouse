/**
 * ./routes/home.js
 * 
 * 코드작성자 : 안중원
 */

const express = require('express');
const { Post, User, Favorite, Sellinfo } = require('../models');

const sequelize = require('sequelize');
const Op = sequelize.Op;

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'university', 'department'],
      },
      limit: 12,
    })

    const favorites = await Favorite.findAll({
      group: ['postIdx'],
      attributes: [[sequelize.fn('COUNT', 'userIdx'), 'usercount'], 'postIdx'],
    })

    res.render('home', { 
      posts: posts, favorites: favorites,
     });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 검색 기능
router.get('/search', async (req, res, next) => {  
  const query = req.query.search;
  console.log("search: ", query);
  if (!query) {
    return res.redirect('/');
  }
  try {  
    const posts = await Post.findAll( { where: { postTitle: {[Op.like]: '%' +query+ '%'}}}); 

    console.log("posts: ", posts);
    return res.render('search', {
      posts: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});


router.get('/attention', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'university', 'department'],
      },
    })
    
    const favorites = await Favorite.findAll({
      where: {userIdx: req.user.id},
    })

    console.log("favorites", favorites);

    res.render('list', { 
      posts: posts, favorites: favorites,
      title: '관심',
     });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
