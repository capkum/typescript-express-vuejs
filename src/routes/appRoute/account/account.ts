/*
  회원 가입 form
 *  Router 등록순선
 *  1. server.ts의 router에 routes.ts 호출
 *  2. routes.ts에서 각 앱들의 라우터를 호출
*/
import { Request, Response, Router } from 'express';
import passport from 'passport';
import { Logger } from 'winston';

import { BaseRoute } from '../../baseRoute';
import { WinstonLogger } from '../../../lib/winstonLogger';

export class Account extends BaseRoute {
  public static logger: Logger = new WinstonLogger().loggerType();

  public static createRoute (router: Router) {
    const register: Account = new Account();

    // sign up
    router.get('/signup', (req: Request, res: Response) => {
      register.signUp(req, res);
    });

    // log in
    router.get('/login', (req: Request, res: Response) => {
      register.logIn(req, res);
    });

  }

  constructor () {
    super();

  }

  // 회원가입
  public signUp (req: Request, res: Response) {
    let options: Object = {
      'title': 'Sign up'
    };
    this.render(req, res, 'views/account/registerForm', options);
  }

  // 회원 로그인
  public logIn (req: Request, res: Response) {
    let options: Object = {
      'title': 'Log In'
    };
    this.render(req, res, 'views/account/loginForm', options);
  }

}
