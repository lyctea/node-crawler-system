/*
 * 爬虫任务管理
 * */
import Biquku from "./biquku.com";
require("./proxy/IpProxyModel");
import XicidailiSpider from "./xicidaili.com";
import { emitter, PROXY_ALREADY } from "./util/event";

class SpiderTask {
  constructor() {
    this.biquku = new Biquku();
    this.xicidailiSpider = new XicidailiSpider();
  }

  start() {
    const _that = this;
    emitter.once(PROXY_ALREADY, function() {
      _that.xicidailiSpider.refreshProxy(); // 测试切换ip代理，重试3次
    });
  }
}

export default SpiderTask;
