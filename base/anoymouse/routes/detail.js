/**
 * ./routes/detail.js
 * 
 * 코드작성자 : 안중원
 */

const { response } = require('express');
const express = require('express');
const { Post, User, Favorite, Comment } = require('../models');
const request = require('request');
let info;


const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.post = req.post;
  next();
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({ 
      include: { model: User,},
      where: { id: req.params.id } });
    const comment = await Comment.findAll({
      where: {
        PostId: post.id,
      }
    })
    var api_url = 'https://openapi.naver.com/v1/search/book?display=1&query=' + encodeURI(post.postTitle); // json 결과
    
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':'sk7QDdAurcd_awY5BgH2', 'X-Naver-Client-Secret': 'M5DFMFhgxk'}
     };
     request.get(options, function (error, response, body) {
    
      if (!error && response.statusCode == 200) {
        info = JSON.parse(body);
        console.log(info);
        console.log(info.items[0].title);
        post.update

      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
    console.log(post);
    res.render('detail', {post: post, comments: comment});
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/attention/:id', async (req, res, next) => {
  try {
    const postIdx = parseInt(req.params.id);
    const attentions = await Favorite.findAll({ 
      where: { userIdx: req.user.id, postIdx: req.params.id },
    });

    if(attentions.length == 0 ){
      console.log("!!!!!!!!!!!!!!!!!!!!!! attention CREATE !!!!!!!!!!!!!!!!!!!!!!");
      await Favorite.create({
        userIdx: req.user.id,
        postIdx: req.params.id,
      })
    } else {
      console.log("!!!!!!!!!!!!!!!!!!!!!!attention DESTROY !!!!!!!!!!!!!!!!!!!!!!");
      await Favorite.destroy({
        where: {userIdx: req.user.id, postIdx: req.params.id}
      })
    }
    
    return res.redirect('/detail/'+ postIdx);
  } catch (err) {
    console.error(err);
    next(err);
  }
});



module.exports = router;

