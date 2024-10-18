/**
 * ./routes/chat.js
 * 
 * 코드 작성자 : 정지창
 */
const express = require('express');
const { Post, User } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.post = req.post;
  next();
});

router.get('/', async (req, res, next) => {
  try {
    res.render('chat');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
    try {
      const post = await Post.findOne({ where: { id: req.params.id }});
      res.render('chat');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });


module.exports = router;