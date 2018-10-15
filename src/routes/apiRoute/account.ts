import { Request, Response, Router } from 'express';
import passport from 'passport';
import { BaseRoute } from '../baseRoute';
import { Logger } from 'winston';
import { WinstonLogger } from '../../lib/winstonLogger';

export class AccountApi extends BaseRoute {
  public static logger: Logger = new WinstonLogger().loggerType();
  public static createRoute (router: Router) {
    let signApi: AccountApi = new AccountApi();

    // local account
    router.post('/api/sign/account', passport.authenticate('local'), (req, res) => {
      let options: Object = {
        'userid': req.body.userid,
        'userpwd': req.body.userpwd
      };

      res.json(options);
    });

    // oauth kakao
    router.get('/api/sign/oauth/kakao', passport.authenticate('kakao', {
      failureRedirect: '#!/account'
    }));

    router.get('/api/sign/oauth/kakao/callback',
      passport.authenticate('kakao', {
        failureRedirect: '#!/account'
      }),
      (req: Request, res: Response, next) => {
        this.logger.info(`[LOGIN] id:${req.user._json.id} ${req.user._json.properties.nickname}`);
        res.redirect('/');
      }
    );

    // oauth facebook
    router.get('/api/sign/oauth/facebook', passport.authenticate('facebook'));

    router.get('/api/sign/oauth/facebook/callback',
      passport.authenticate('facebook', {
        failureRedirect: '/account'
      }),
      (req: Request, res: Response) => {
        this.logger.info(`[LOGIN] id:${req.user._json.id} ${req.user._json.name}`);
        res.redirect('/');
      });

    // oauth google
    router.get('/api/sign/oauth/google/', passport.authenticate('google',{
      scope: ['profile']
    }));

    router.get('/api/sign/oauth/google/callback',
      passport.authenticate('google', {
        failureRedirect: '/account'
      }),
      (req: Request, res: Response) => {
        this.logger.info(`[LOGIN] id:${req.user._json.id} ${req.user.displayName}`);
        res.redirect('/');
      });

    // log out
    router.get('/api/sign/account/logout', (req: Request, res: Response) => {
      this.logger.info(`[LOGOUT] id:${req.user._json.id} ${req.user._json.name}`);
      req.logout();

      if (req.session) {
        req.session.save(() => {
          res.redirect('/');
        });
      }
    });

    // router.put('/api/login', (req: Request, res: Response) => {
    //   signApi.update(req, res);
    // });

    // router.get('/api/login/:userid', (req: Request, res: Response) => {
    //   signApi.select(req, res);
    // });

    // router.delete('/api/login/:userid', (req: Request, res: Response) => {
    //   signApi.delete(req, res);
    // });
  }

  constructor () {
    super();
  }

  public create (req: Request, res: Response) {
    // let userid = req.body.userid;
    // let userpwd = req.body.userpwd;
    // let snsAouth = req.body.snsAouth;

    res.json(req.body);
  }

  // public update (req: Request, res: Response) {
  //   res.send('회원정보 수정');
  // }

  // public select (req: Request, res: Response) {
  //   res.send('회원정보');
  // }

  // public delete (req: Request, res: Response) {
  //   res.send('회원정보 삭제');
  // }

}
