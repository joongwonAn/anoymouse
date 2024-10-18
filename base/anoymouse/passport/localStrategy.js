/**
 * 코드 작성자 : 안중원
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'userPw',
  }, async (userId, userPw, done) => {
    try {
      const exUser = await User.findOne({ where: { userId } });
      if (exUser) {
        const result = await (userPw == exUser.userPw);
        console.log(result);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
