/**
 * ./routes/list.js
 * 
 * 코드작성자 : 안중원
 */

 const { response } = require('express');
 const express = require('express');
 const { Post, User, Sellinfo, Favorite } = require('../models');
 
 const router = express.Router();
 
 router.use((req, res, next) => {
   res.locals.user = req.user;
   res.locals.post = req.post;
   next();
 });

 //  모든 중고교재
 router.get('/', async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'university', 'department'],
        },
      })

      const categorys = await Sellinfo.findAll({
        
        attributes: ['id', 'category', 'seller', 'postIdx'],
      })

      res.render('list', { 
        posts: posts, categorys: categorys,
        title: '모든 중고교재',
       });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

    // 전공
 router.get('/core', async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'university', 'department'],
        },
      })


      const categorys = await Sellinfo.findAll({
        where: {category: '전공'},
        attributes: ['id', 'category', 'seller', 'postIdx'],
      })

      res.render('list', { 
        posts: posts, categorys: categorys,
        title: '전공',
       });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
 
  router.get('/electives', async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'university', 'department'],
        },
      })


      const categorys = await Sellinfo.findAll({
        where: {category: '교양'},
        attributes: ['id', 'category', 'seller', 'postIdx'],
      })

      res.render('list', { 
        posts: posts, categorys: categorys,
        title: '교양',
       });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  // 내가 쓴 글
  router.get('/:id', async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'university', 'department'],
          where: {id: req.params.id}
        },
      })

      const user = await User.findOne({
        where: {id: req.params.id},
        attributes: ['userNickname'],
      })

      res.render('list', { 
        posts: posts,
        title: user.dataValues.userNickname + '님이 쓴 글',
       });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  


 module.exports = router;
 