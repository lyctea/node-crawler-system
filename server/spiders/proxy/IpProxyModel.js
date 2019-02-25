import { CronJob } from "cron";
import logger from "../../config/log";
import { fetchLatestIp } from "../xicidaili.com";

class IpProxyModel {
  constructor(size = 1000) {
    this.bufferMaxSize = size;
    this.buffer = [];
    this.bufferSize = this.buffer.length;
    this.fetchBufferPage = 0;
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
      if (
        this.blacklist.filter(proxy => proxy.ip === data.ip) &&
        this.buffer.filter(proxy => proxy.ip === data.ip)
      ) {
        return;
      }

      this.buffer.unshift(data);
      return this.buffer.length;
    } else {
      throw new Error("buffer size max");
    }
  }

  /**
   * 消费者使用 ip
   * @returns {*}
   */
  consumeIp() {
    if (this.buffer.length) {
      return this.buffer.pop();
    } else {
      throw new Error("buffer is empty");
    }
  }

  /**
   * 轮询，当缓冲池不满时补充 ip
   */
  pollFetchBufferData() {
    const _that = this;
    if (this.buffer.length < this.bufferMaxSize) {
      new CronJob(
        "*/10 * * * * *",
        function() {
          if (_that.bufferSize < _that.bufferMaxSize) _that.produceIp();
        },
        function() {
          logger.info("[refresh proxy pool] cron-job over @date:" + new Date());
        },
        true,
        "Asia/Shanghai"
      );
    }
  }

  /**
   * 通过爬虫获取最新的ip地址
   * @returns {Promise<void>}
   */
  async produceIp() {
    const ips = await fetchLatestIp(this.fetchBufferPage++);
    ips.forEach(ip => this.insertIpBuffer(ip));

    if (this.bufferSize < this.bufferMaxSize) {
      await this.produceIp();
    } else {
      this.fetchBufferPage = 0;
    }
  }

  insertBlacklist(ip) {
    this.blacklist.push(ip);
  }
}

export default IpProxyModel;
