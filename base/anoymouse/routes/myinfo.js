/**
 * ./routes/myinfo.js
 *
 * 코드 작성자 :  안중원
 */

 const { response } = require('express');
 const express = require('express');
 const { Post, User, Sellinfo } = require('../models');
 
 const router = express.Router();
 
 router.use((req, res, next) => {
   res.locals.user = req.user;
   res.locals.post = req.post;
   next();
 });


 router.get('/', async (req, res, next) => {
  try {

    res.render('myinfo');
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// 닉네임 수정
  router.route('/editnick')
  .patch(async (req, res, next) => {
    try {
      const nickResult = await User.update({
        userNickname: req.body.userNickname,
      }, {
        where: { id: req.user.id },
      });
      console.log("nickResult", nickResult);
      res.json(nickResult);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 비밀번호 수정
router.route('/editpw')
  .patch(async (req, res, next) => {
    try {
      const pwResult = await User.update({
        userPw: req.body.newpw,
      }, {
        where: { id: req.user.id },
      });
      console.log("pwResult", pwResult);
      res.json(pwResult);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });


 module.exports = router;
 