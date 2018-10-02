import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import express from 'express';
import { Request, Response, NextFunction as nextFunc } from 'express';
import path from 'path';
import { Apps } from './routes/routes';
import nunjucks from 'nunjucks';

import { WinstonLogger, LoggerStream } from './lib/winstonLogger';

interface IError {
  status?: number;
  message?: string;
  stack?: string;
}

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
    // js, common path
    this.app.use(express.static(path.join(__dirname, 'assets')));

    // view templates path
    this.app.set('views', path.join(__dirname));

    // view engjine nunjucks config
    nunjucks.configure(this.app.get('views'), {
      autoescape: true,
      express: this.app
    });
    this.app.set('view engine', 'njk');

    // use json parser
    this.app.use(bodyParser.json());

    // use query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // use cookie parser
    // signature: SECRET GOES HERE
    this.app.use(cookieParser('SECRET_GOES_HERE'));

    // use winston logger
    this.logger.info(`** success express config loaded  **`);
    this.app.use(require('morgan')('dev',
      {
        stream: new LoggerStream()
      },
      {
        flags: 'a'
      }
    ));

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
