import request from "request-promise";
import logger from "../../config/log";
import { autoRetry } from "./autoRetry";

const maxReTryLimit = 3;

function re(options) {
  const opts = typeof options === "string" ? { url: options } : options;
  return request(options)
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(error => {
      logger.error(error && error.message);
      return Promise.reject("请求失败！");
    });
}

re = autoRetry(re, maxReTryLimit);

export default re;
