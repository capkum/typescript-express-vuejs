import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../baseRoute';

export class IndexRoute extends BaseRoute {

  public static createRoute (router: Router) {
    // add index route
    router.get('/', (req: Request, res: Response) => {
      new IndexRoute().index(req, res);
    });
  }

  constructor () {
    super();
  }

  public index (req: Request, res: Response) {
    this.title = 'Home | Kums WereHouse';
    let loginStatus: boolean = (req.user !== undefined) ? true : false;
    let userName: string = (req.user !== undefined) ? req.user._json.name : '';
    let options: Object = {
      'msg': 'Welcome to the kums werehouse',
      'title': this.title,
      'loginStatus': loginStatus,
      'userName': userName
    };

    this.render(req, res, 'views/index', options);
  }
}
