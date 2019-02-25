/*
 * 爬虫任务管理
 * */
import Biquku from "./biquku.com";
import XicidailiSpider from "./xicidaili.com";
import { CronJob } from "cron";
import logger from "../config/log";

class SpiderTask {
  constructor() {
    this.biquku = new Biquku();
    this.xicidailiSpider = new XicidailiSpider();
  }

  start() {
    console.log("✅ Start Spider Task");
    // this.biquku.start();
    // this.xicidailiSpider.refreshProxy();
    //
    // const proxy = this.xicidailiSpider.usableProxy(0);
    // console.log(proxy);

    // this.refreshProxyPool();
  }

  /**
   * 每隔30分钟定时刷新ip代理池
   */
  refreshProxyPool() {
    const _that = this;
    new CronJob(
      "* 30 * * * *",
      function() {
        _that.xicidailiSpider.refreshProxy();
      },
      function() {
        logger.info("[refresh proxy pool] cron-job over @date:" + new Date());
      },
      true,
      "Asia/Shanghai"
    );
  }
}

export default SpiderTask;
