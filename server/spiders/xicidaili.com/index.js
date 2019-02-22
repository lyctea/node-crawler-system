import { fetchLatestIp } from "./spider";
require("../../database/xicidaili.com/proxySchema");
import mongoose from "mongoose";

const Proxy = mongoose.model("xicidaili.com_Proxy");

class XicidailiSpider {
  constructor() {
    this.maxPages = 2;
  }

  async latestIp() {
    for (let i = 1; i <= this.maxPages; i++) {
      const ips = await fetchLatestIp(i);
      await Proxy.saveProxy(ips);
    }
  }
}

export default XicidailiSpider;
