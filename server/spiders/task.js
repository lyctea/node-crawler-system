/*
 * 爬虫任务管理
 * */
import Biquku from "./biquku.com";
import XicidailiSpider from "./xicidaili.com";

class SpiderTask {
  constructor() {
    this.biquku = new Biquku();
    this.xicidailiSpider = new XicidailiSpider();
  }

  start() {
    console.log("✅ Start Spider Task");
    // this.biquku.start();
    // this.xicidailiSpider.latestIp();

    const proxy = this.xicidailiSpider.usableProxy(0);
    console.log(proxy);
  }
}

export default SpiderTask;
