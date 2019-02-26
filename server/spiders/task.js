/*
 * 爬虫任务管理
 * */
import Biquku from "./biquku.com";
import ipProxyModel from "./proxy/IpProxyModel";
import XicidailiSpider from "./xicidaili.com";
import emitter from "./util/event";

class SpiderTask {
  constructor() {
    this.biquku = new Biquku();
    this.xicidailiSpider = new XicidailiSpider();
  }

  start() {
    // this.biquku.start();
    const _that = this;
    emitter.once("taskReadyStart", function() {
      console.log("taskReadyStart");
      _that.xicidailiSpider.refreshProxy();
    });
  }
}

export default SpiderTask;
