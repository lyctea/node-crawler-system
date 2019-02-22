import rp from "request-promise";
import { afterDecode } from "../util/parse";
import { XICIDAILI_NN } from "../api";

const cheerio = require("cheerio");

export function fetchLatestIp(page) {
  return rp({ url: XICIDAILI_NN(page), encoding: null }).then(res => {
    const $ = cheerio.load(res);

    const ipList = $("#ip_list tr").slice(3);

    let result = [];
    ipList.each((i, elem) => {
      const tr = $(elem).children();
      result.push({
        ip: tr.eq(1).text(),
        port: tr.eq(2).text(),
        anonymity: tr.eq(4).text(),
        httpType: tr.eq(5).text()
      });
    });
    console.log(XICIDAILI_NN(page));
    return result.filter(ip => ip.anonymity === "高匿");
  });
}
