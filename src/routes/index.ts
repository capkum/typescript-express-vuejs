import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from './route';

export class IndexRoute extends BaseRoute {

  public static createRoute(router: Router) {
    console.log('[IndexRoute::create] Creating index route');

    // add index route
    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });
  }

  constructor() {
    super();
  }

  public index(req: Request, res: Response, next: NextFunction) {
    this.title = 'Home | Kums WereHouse';
    let options: Object = {
      'msg': 'Welcome to the kums werehouse'
    };

    this.render(req, res, 'views/index', options);
  }
}
