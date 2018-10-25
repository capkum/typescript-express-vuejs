/**
 *  앱들의 라우터를 한곳에서 관리
 *  등록순선
 *  1. server.ts의 router에 routes.ts 호출
 *  2. routes.ts에서 각 앱들의 라우터를 호출
 */

import express from 'express';
import { IndexRoute } from './appRoute';
import { Account } from './appRoute/account/account';
import { LogInOut } from './apiRoute/account/logInOut';

// app들의 라우터를 한곳에 모음
export class Apps {
  protected router: express.Router;

  constructor (router: express.Router) {
    this.router = router;
  }

  // app을 한곳에
  public apps () {
    IndexRoute.createRoute(this.router);
    Account.createRoute(this.router);
    LogInOut.createRoute(this.router);
  }

}
