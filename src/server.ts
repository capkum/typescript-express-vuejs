import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import methodOverride from 'method-override';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import nunjucks from 'nunjucks';
import favicon from 'serve-favicon';

import { Request, Response, NextFunction as nextFunc } from 'express';
import { Apps } from './routes/routes';
import { WinstonLogger, LoggerStream } from './lib/winstonLogger';
import { IError } from './lib/interfaces';
import { passportConfig } from './lib/passportConfig';

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
    // favicon
    this.app.use(favicon(path.join(__dirname, 'assets', 'img', 'monhun.ico')));

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

    // use method override
    this.app.use(methodOverride());

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

    // use session
    this.app.use(session({
      secret: 'secretcode',
      resave: true,
      saveUninitialized: false
    }));

    // use passport
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passportConfig();
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
