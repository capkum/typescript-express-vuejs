import { BaseRoute } from '../baseRoute';
import { Request, Response, NextFunction, Router } from 'express';
import { Sign } from '../../apps/sign';

export class SignRoute extends BaseRoute {
  public app: Sign;

  // add route
  public static createRoute (router: Router) {
    router.get('/sign', (req: Request, res: Response) => {
      new SignRoute().index(req, res);
    });

    router.post('/sign', (req: Request, res: Response) => {
      new SignRoute().create(req, res);
    });

    router.put('/sign', (req: Request, res: Response) => {
      new SignRoute().update(req, res);
    });

    router.get('/sign/:userid', (req: Request, res: Response) => {
      new SignRoute().select(req, res);
    });

    router.delete('/sign/:userid', (req: Request, res: Response) => {
      new SignRoute().delete(req, res);
    });
  }
  constructor () {
    super();
    this.app = new Sign();
  }

  // 회원가입 폼
  public index (req: Request, res: Response) {
    this.title = 'Home | Sign';
    let options: Object = {
      title: this.title,
      msg: '회원가입 메세지'
    };
    this.render(req, res, 'views/index', options);
  }

  public create (req: Request, res: Response) {
    res.send('회원 정보 입력');
  }

  public update (req: Request, res: Response) {
    res.send('회원정보 수정');
  }

  public select (req: Request, res: Response) {
    res.send('회원정보');
  }

  public delete (req: Request, res: Response) {
    res.send('회원정보 삭제');
  }
}
