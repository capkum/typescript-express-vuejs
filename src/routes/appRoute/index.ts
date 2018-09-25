import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../baseRoute';

export class IndexRoute extends BaseRoute {

  public static createRoute (router: Router) {
    // add index route
    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });
  }

  constructor () {
    super();
  }

  public index (req: Request, res: Response, next: NextFunction) {
    this.title = 'Home | Kums WereHouse';
    let options: Object = {
      'msg': 'Welcome to the kums werehouse'
    };

    this.render(req, res, 'views/index', options);
  }
}
