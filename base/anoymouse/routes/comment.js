/**
 * ./routes/comment.js
 * 
 * 코드 작성자 : 정지창
 */

const express = require('express');
const { Post, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/:id', isLoggedIn, async (req, res, next) => {
  try {
    console.log("///");
    const post = await Post.findOne({
      where: { id: req.params.id } });
    const comment = await Comment.create({
      comment: req.body.comment,
      PostId: req.body.postid,
      UserNick: req.body.usernick,
    });
    console.log(comment);
    res.redirect(`/detail/${post.id}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/modify', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.update({
      comment: req.body.comment,},{

      where: { id: req.body.id},
    });
    console.log(comment);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/:id')
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update({
        comment: req.body.comment,
      }, {
        where: { id: req.body.id },
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.destroy({ where: { id: req.params.id } });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
