import createError from 'http-errors';
import express from 'express';

import { Conf } from './conf/conf';
import { Request, Response, NextFunction as nextFunc } from 'express';
import { Apps } from './routes/routes';
import { WinstonLogger, LoggerStream } from './lib/winstonLogger';
import { IError } from './lib/interfaces';

// class Server
export class Server extends WinstonLogger {
  public app: express.Application;

  public static bootstrap (): Server {
    return new Server();
  }

  constructor () {
    super();
    this.app = express();
    this.config();
    this.routes();
    this.api();
    this.errorHandler();
  }

  public config () {
    new Conf(this.app).config();
  }

  public routes () {
    let router: express.Router;
    router = express.Router();

    new Apps(router).apps();

    this.app.use(router);
    this.logger.info('** success express routes loaded  **');
  }

  public api () {

  }

  // catch 404 and forward to error handler
  public errorHandler () {
    this.app.use((req: Request, res: Response, next: nextFunc) => {
      next(createError(404));
    });

    this.app.use((err: IError, req: Request, res: Response, next: nextFunc) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      // res.render('views/error');

      // use winston logger
      this.logger.error(`${err.status} ${err.message} ${err.stack}`);

      next();
    });
  }
}
