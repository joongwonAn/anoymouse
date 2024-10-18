/**
 * ./routes/write.js
 * 
 * 코드작성자 : 정지창
 */

const { response } = require('express');
const express = require('express');
const { Post, User, sellinfo, Sellinfo, Bookinfo } = require('../models');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { isLoggedIn } = require('./middlewares');
const request = require('request');
let info;
var client_id = 'sk7QDdAurcd_awY5BgH2';
var client_secret = 'M5DFMFhgxk';

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.post = req.post;
  next();
});
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const timestamp = new Date().getTime().valueOf();
      const filename = path.basename(file.originalname, ext) + timestamp + ext;
      cb(null, filename);
    },
  }),
});

router.get('/', async (req, res, next) => {
  try {
    res.render('write');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/', upload.single("filename"), async (req, res, next) => {
    try {
        const newPost = await Post.create({
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
            postPrice: req.body.postPrice,
            postStatus: '',
            viewCount : 0,
            chatCounnt: 0,
            img: `/img/${req.file.filename}`,
            UserId: req.user.id,
        });
        const newsell = await Sellinfo.create({
          subject: req.body.subject,
          professor: req.body.professor,
          grades: req.body.grades,
          year: req.body.year,
          semester: req.body.semester,
          category: req.body.category,
          seller: req.user.id,
          postIdx: newPost.id,
      })
        
      res.redirect(`/detail/${newPost.id}`);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  router.post('/search', async (req, res, next) => {
    var api_url = 'https://openapi.naver.com/v1/search/book?display=1&query=' + encodeURI(req.body.query); // json 결과
    
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':'sk7QDdAurcd_awY5BgH2', 'X-Naver-Client-Secret': 'M5DFMFhgxk'}
     };
     request.get(options, function (error, response, body) {
    
      if (!error && response.statusCode == 200) {
        info = JSON.parse(body);
        console.log(info); 
        try {
          const bookinfo = Bookinfo.create({
            title: info.title,
            author: info.author,
            price: info.price,
            publisher: info.publisher,
            ISBN: info.isbn,
          });
          res.render('write');
        } catch (err) {
          console.error(err);
          next(err);
        }       
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
    
    try {
      // const bookinfo = await Bookinfo.create({
      //   // title: info.title,
      //   // author: info.author,
      //   // price: info.price,
      //   // publisher: info.publisher,
      //   // ISBN: info.isbn,
      // });
      res.render('write');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });



module.exports = router;
