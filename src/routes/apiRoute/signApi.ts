import { BaseRoute } from '../baseRoute';
import { Request, Response, Router } from 'express';

export class SignApi extends BaseRoute {
  public static createRoute (router: Router) {
    router.post('/api/sign', (req: Request, res: Response) => {
      new SignApi().create(req, res);
    });

    router.put('/api/sign', (req: Request, res: Response) => {
      new SignApi().update(req, res);
    });

    router.get('/api/sign/:userid', (req: Request, res: Response) => {
      new SignApi().select(req, res);
    });

    router.delete('/api/sign/:userid', (req: Request, res: Response) => {
      new SignApi().delete(req, res);
    });
  }

  constructor () {
    super();
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
