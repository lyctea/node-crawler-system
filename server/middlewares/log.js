import log4js from "log4js";
import logger from "../config/log";

export const loggerMiddleware = app => {
  app.use(log4js.connectLogger(logger));
};
