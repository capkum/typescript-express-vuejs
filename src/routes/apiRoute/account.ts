import { BaseRoute } from '../baseRoute';
import { Request, Response, Router } from 'express';
import passport from 'passport';

export class AccountApi extends BaseRoute {
  public static createRoute (router: Router) {
    let signApi: AccountApi = new AccountApi();

    router.post('/api/sign/account', passport.authenticate('local'), (req, res) => {
      let options: Object = {
        'userid': req.body.userid,
        'userpwd': req.body.userpwd
      };

      res.json(options);
    });

    // router.put('/api/login', (req: Request, res: Response) => {
    //   signApi.update(req, res);
    // });

    // router.get('/api/login/:userid', (req: Request, res: Response) => {
    //   signApi.select(req, res);
    // });

    // router.delete('/api/login/:userid', (req: Request, res: Response) => {
    //   signApi.delete(req, res);
    // });
  }

  constructor () {
    super();
  }

  public create (req: Request, res: Response) {
    // let userid = req.body.userid;
    // let userpwd = req.body.userpwd;
    // let snsAouth = req.body.snsAouth;

    res.json(req.body);
  }

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