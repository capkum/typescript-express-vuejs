import express, { NextFunction } from "express";
import { Request, Response, NextFunction as nextFunc } from 'express';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import * as path from "path";
import createError from "http-errors";
import { Apps } from "./routes/apps";
import { Logger } from 'winston'

import { WinstonLogger } from "./lib/winstonLogger";

interface IError {
  status?: number;
  message?: string;
}

// class Server
export class Server extends WinstonLogger {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    super();
    this.app = express();
    this.config();
    this.routes();
    this.api();
    this.errorHandler();
  }

  public config() {

    // js, common path
    this.app.use(express.static(path.join(__dirname, 'assets')));

    // view template engin
    this.app.set('views', path.join(__dirname));
    this.app.set('view engine', 'ejs');

    // use query string parser
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // use json parser
    this.app.use(bodyParser.json());

    // use cookie parser
    // signature: SECRET GOES HERE
    this.app.use(cookieParser('SECRET_GOES_HERE'));

    // use winston logger
    this.logger.info('** success express config loaded  **');
  }

  public routes() {
    let router: express.Router;
    router = express.Router();

    new Apps(router).apps();

    this.app.use(router);
    this.logger.info('** success express routes loaded  **');
  }

  public api() {
  }

  // catch 404 and forward to error handler
  public errorHandler() {
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
      this.logger.error(`${err.status} ${err.message}`);

      next();
    });
  }
}
