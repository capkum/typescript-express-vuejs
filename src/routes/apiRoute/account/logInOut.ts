/**
 *  로그인
 *  Router 등록순선
 *  1. server.ts의 router에 routes.ts 호출
 *  2. routes.ts에서 각 앱들의 라우터를 호출
 */
import { Request, Response, Router } from 'express';
import passport from 'passport';
import { BaseRoute } from '../../baseRoute';
import { Logger } from 'winston';
import { WinstonLogger } from '../../../lib/winstonLogger';
import Book from '../../../models/book';

export class LogInOut extends BaseRoute {
  public static logger: Logger = new WinstonLogger().loggerType();
  public static createRoute (router: Router) {
    let logInOut: LogInOut = new LogInOut();

    // local account
    router.post('/api/account/login', passport.authenticate('local'), (req, res) => {
      let options: Object = {
        'userid': req.body.userid,
        'userpwd': req.body.userpwd
      };

      res.json(options);
    });

    // oauth kakao
    router.get('/api/oauth/kakao', passport.authenticate('kakao', {
      failureRedirect: '#!/login'
    }));

    router.get('/api/oauth/kakao/callback',
      passport.authenticate('kakao', {
        failureRedirect: '#!/login'
      }),
      (req: Request, res: Response, next) => {
        this.logger.info(`[LOGIN] id:${req.user._json.id} ${req.user._json.properties.nickname}`);
        res.redirect('/');
      }
    );

    // oauth facebook
    router.get('/api/oauth/facebook', passport.authenticate('facebook'));

    router.get('/api/oauth/facebook/callback',
      passport.authenticate('facebook', {
        failureRedirect: '/login'
      }),
      (req: Request, res: Response) => {
        this.logger.info(`[LOGIN] id:${req.user._json.id} ${req.user._json.name}`);
        res.redirect('/');
      });

    // oauth google
    router.get('/api/oauth/google/', passport.authenticate('google',{
      scope: ['profile']
    }));

    router.get('/api/oauth/google/callback',
      passport.authenticate('google', {
        failureRedirect: '/login'
      }),
      (req: Request, res: Response) => {
        this.logger.info(`[LOGIN] id:${req.user._json.id} ${req.user.displayName}`);
        res.redirect('/');
      });

    // log out
    router.get('/api/account/logout', (req: Request, res: Response) => {
      this.logger.info(`[LOGOUT] id:${req.user._json.id} ${req.user._json.name}`);
      req.logout();

      if (req.session) {
        req.session.save(() => {
          res.redirect('/');
        });
      }
    });

    router.get('/test', (req: Request, res: Response) => {
      logInOut.test(req, res);
    });

    router.get('/test/dave', (req: Request, res: Response) => {
      logInOut.testCreate(req, res);
    });
  }

  constructor () {
    super();
  }

  public test (req: Request, res: Response) {
    Book.find()
      .sort({ published_date: -1 })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  public testCreate (req: Request, res: Response) {
    const title = 'Python3';
    const author = 'capture1';
    let book = new Book({
      title,
      author
    });
    book.save().then(() => {
      res.redirect('../test');
    })
    .catch((err) => {
      console.error(err);
    });

  }
}
