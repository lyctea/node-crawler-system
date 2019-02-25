/*
 * 爬虫任务管理
 * */
import Biquku from "./biquku.com";
import { CronJob } from "cron";
import logger from "../config/log";
import IpProxyModel from "./proxy/IpProxyModel";

class SpiderTask {
  constructor() {
    this.biquku = new Biquku();
    this.ipProxyModel = new IpProxyModel(); // 初始化ip代理池
    setInterval(() => {
      const ip = this.ipProxyModel.consumeIp();
      console.log(ip);
    }, 200);
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
}

export default SpiderTask;
