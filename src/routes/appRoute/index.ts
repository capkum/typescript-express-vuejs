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
    let userName: string = '';
    let loginStatus: boolean = (req.user !== undefined) ? true : false;

    if (loginStatus) {
      switch (req.user.provider) {
        case 'kakao':
          userName = req.user._json.properties.nickname;
          break;

        case 'facebook':
          userName = req.user._json.name;
          break;

        case 'google':
          userName = req.user._json.displayName;
          break;
      }
    }

    let options: Object = {
      'title': 'Home | Kums WereHouse',
      'loginStatus': loginStatus,
      'userName': userName
    };

    this.render(req, res, 'views/index', options);
  }
}
