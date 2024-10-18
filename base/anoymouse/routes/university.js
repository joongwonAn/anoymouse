/**
 * ./routes/university.js
 *
 * 코드 작성자 : 안중원
 */

 const { response } = require('express');
 const express = require('express');
 const { Post, User, Sellinfo, Favorite } = require('../models');
 
const sequelize = require('sequelize');
 const Op = sequelize.Op;

 const router = express.Router();
 
 router.use((req, res, next) => {
   res.locals.user = req.user;
   res.locals.post = req.post;
   next();
 });

 router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
          include: {
            model: User,
            attributes: ['id', 'university', 'department'],
          },
        })
  
        
        res.render('university', { 
          posts: posts,
         });
      } catch (err) {
        console.error(err);
        next(err);
      }
  });


  router.get('/hansung', async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'university', 'department'],
          where: {university: {[Op.like]: '%' +'한성'+ '%'}},
        },
      })
      
      
      res.render('university', { 
        posts: posts,
       });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  router.get('/seoul', async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'university', 'department'],
          where: {university: {[Op.like]: '%' +'서울'+ '%'}},
        },
      })
      
      
      res.render('university', { 
        posts: posts,
       });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  router.get('/other', async (req, res, next) => {
    try {
      res.render('university', { 
        title: '검색 결과 없음',
       });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

 module.exports = router;
 