import logger from "../../config/log";
import ipProxyModel from "../proxy/IpProxyModel";

/**
 * 包裹方法，使其自动错误重试，可以返回成功的结果或者最后失败的结果
 * @param func 被包裹的方法
 * @param retryMax 最大重试次数
 * @returns {function(): Promise<any>} 返回 Promise
 */
export function autoRetry(func, retryMax) {
  let retryNum = 0;
  let funcName = func.toString().match(/function (\w+)\(/)[1];

  let funcR = function() {
    let params = arguments;
    return new Promise((resolve, reject) => {
      func(...params)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          if (retryNum < retryMax) {
            retryNum++;
            logger.warn(
              `[autoRetry] Catched error when ${funcName}() : ${
                err.message
              }. Retry ${retryNum} time...`
            );
            const ip = ipProxyModel.consumeIp();
            const options = Object.assign(params, { proxy: ip });
            resolve(funcR(...options));
          } else {
            reject(err);
          }
        });
    });
  };

  return funcR;
}
