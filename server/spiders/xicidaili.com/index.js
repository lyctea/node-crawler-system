import { fetchLatestIp } from "./spider";
import mongoose from "mongoose";

class XicidailiSpider {
  constructor() {
    this.maxPages = 2;
  }

  /**
   * 更新ip代理池
   * @returns {Promise<void>}
   */
  async refreshProxy() {
    this.ProxySchema = mongoose.model("xicidaili.com_Proxy");

    for (let i = 1; i <= this.maxPages; i++) {
      const ips = await fetchLatestIp(i);
      if (Array.isArray(ips)) {
        await Proxy.saveProxy(ips);
      }
    }
  }

  async usableProxy(index) {
    const proxy = await Proxy.getUsableProxy(index);
    return proxy;
  }
}

export default XicidailiSpider;
