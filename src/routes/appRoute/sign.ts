import { BaseRoute } from '../baseRoute';
import { Request, Response, NextFunction, Router } from 'express';
import { Sign } from '../../apps/sign/sign';

export class SignRoute extends BaseRoute {
  public app: Sign;

  // add route
  public static createRoute (router: Router) {
    router.get('/account', (req: Request, res: Response) => {
      new SignRoute().accountForm(req, res);
    });

    // router.post('/sign', (req: Request, res: Response) => {
    //   new SignRoute().create(req, res);
    // });

    // router.put('/sign', (req: Request, res: Response) => {
    //   new SignRoute().update(req, res);
    // });

    // router.get('/sign/:userid', (req: Request, res: Response) => {
    //   new SignRoute().select(req, res);
    // });

    // router.delete('/sign/:userid', (req: Request, res: Response) => {
    //   new SignRoute().delete(req, res);
    // });
  }
  constructor () {
    super();
    this.app = new Sign();
  }

  // 회원가입 폼
  public accountForm (req: Request, res: Response) {
    let options: Object = {
      'title': 'Home | Sign'
    };
    this.render(req, res, 'views/sign/accountForm', options);
  }

  // public create (req: Request, res: Response) {
  //   res.send('회원 정보 입력');
  // }

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
