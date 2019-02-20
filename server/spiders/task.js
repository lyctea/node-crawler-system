/*
 * 爬虫任务管理
 * */
import Biquku from "./biquku.com";

class SpiderTask {
  constructor() {
    this.biquku = new Biquku();
  }

  start() {
    console.log("✅ Start Spider Task");
    this.biquku.start();
  }
}

export default SpiderTask;
