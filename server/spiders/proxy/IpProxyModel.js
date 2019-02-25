import { CronJob } from "cron";
import logger from "../../config/log";
import fetch_proxy_66cn from "./66ip.cn";

class IpProxyModel {
  constructor(size = 400) {
    this.bufferMaxSize = size;
    this.buffer = [];
    this.blacklist = [];

    this.pollFetchBufferData();
  }

  /**
   * 将 ip 插入缓存池中
   * @param data 插入的数据
   * @returns {number} 当前缓存池大小
   */
  insertIpBuffer(data) {
    if (this.buffer.length < this.bufferMaxSize) {
      //  去重 && 黑名单
      if (!this.blacklist.includes(data) && !this.buffer.includes(data)) {
        this.buffer.unshift(data);
        return this.buffer.length;
      }
    } else {
      // logger.info("buffer size max");
    }
  }

  /**
   * 消费者使用 ip
   * @returns {*}
   */
  consumeIp() {
    if (this.buffer.length) {
      const ip = this.buffer.pop();
      this.blacklist.push(ip); // 使用过的 ip 加入黑名单
      return ip;
    } else {
      // logger.info("buffer is empty");
    }
  }

  /**
   * 轮询，当缓冲池不满时补充 ip
   */
  pollFetchBufferData() {
    const _that = this;
    const cronJob = new CronJob(
      "*/30 * * * * *",
      function() {
        if (_that.buffer.length < _that.bufferMaxSize) _that.produceIp();
      },
      function() {
        logger.info("[refresh proxy pool] cron-job over @date:" + new Date());
      },
      true,
      "Asia/Shanghai"
    );

    cronJob.start();
  }

  /**
   * 通过爬虫获取最新的ip地址
   * @returns {Promise<void>}
   */
  async produceIp() {
    if (this.buffer.length >= this.bufferMaxSize) {
      return;
    }

    const ips = await fetch_proxy_66cn();

    if (ips && ips.length) {
      ips.forEach(ip => this.insertIpBuffer(ip));
    } else {
      console.log("请求不到数据！");
    }
  }

  insertBlacklist(ip) {
    this.blacklist.push(ip);
  }
}

export default IpProxyModel;
