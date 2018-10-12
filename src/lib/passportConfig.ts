import { Logger } from 'winston';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as KaKaoStrategy } from 'passport-kakao';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { OAuth2Strategy } from 'passport-google-oauth';

import { WinstonLogger } from '../lib/winstonLogger';

export class PassportConf extends WinstonLogger {
  constructor () {
    super();
    passport.serializeUser((user, done) => {
      this.logger.debug('회원 가입 성공2');
      done(null, user);
    });

    passport.deserializeUser((id, done) => {
      this.logger.debug('이미 가입되었습니다.');
      done(null, id);
    });
    this.passportConf();
  }

  public passportConf () {
    this.localStrategy();
    this.facebookStrategy();
  }

  public facebookStrategy () {
    passport.use(new FacebookStrategy({
      clientID: String(process.env.FACEBOOK_CLIENT_ID),
      clientSecret: String(process.env.FACEBOOK_CLIENT_SECRET) ,
      callbackURL: 'https://localhost:8080/api/sign/oauth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
      enableProof: true
    },
      (accessToken, refreshToken, profile, done) => {
        this.logger.debug(profile._json);
        return done(null, profile);
      }
    ));
  }

  public localStrategy () {
    passport.use(new LocalStrategy(
      {
        usernameField: 'userid',
        passwordField: 'userpwd'
      },
      (userid, userpwd, done) => {
        if (userid === 'capture1') {
          return done(null, userid);
        } else {
          return done(null, false);
        }
      }
    ));
  }

}

// export const passportConfig = () => {
//   passport.serializeUser((user, done) => {
//     logger.debug('회원 가입 성공2');
//     done(null, user);
//   });

//   passport.deserializeUser((id, done) => {
//     // 회원으로 들어오는 값을 체크해서 자동으로 로그인하게 해야됨
//     logger.debug('이미 가입되었습니다.');
//     done(null, id);
//   });

//   passport.use(new LocalStrategy(
//     {
//       usernameField: 'userid',
//       passwordField: 'userpwd'
//     },
//     (userid, userpwd, done) => {
//       if (userid === 'capture1') {
//         return done(null, userid);
//       } else {
//         return done(null, false);
//       }
//     }
//   ));

// };
