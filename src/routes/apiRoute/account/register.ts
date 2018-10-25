/**
 *  회원가입
 *  Router 등록순선
 *  1. server.ts의 router에 routes.ts 호출
 *  2. routes.ts에서 각 앱들의 라우터를 호출
 */
import { Request, Response, Router } from 'express';
import passport from 'passport';
import { Logger } from 'winston';

import { BaseRoute } from '../../baseRoute';
import { WinstonLogger } from '../../../lib/winstonLogger';

export class SigninApi extends BaseRoute {
  public static logger: Logger = new WinstonLogger().loggerType();

  public static createRoute (router: Router) {
    const signIn: SigninApi = new SigninApi();

    // local account
    router.post('/api/sign/signin',
      passport.authenticate('local'),
      (req: Request, res: Response) => {
        let options: Object = {
          'userName': req.body.userName,
          'userEmail': req.body.userEmail,
          'userPwd': req.body.userPwd,
          'status': 200
        };

        res.json(options);
      });

  }

  constructor () {
    super();

  }

}
