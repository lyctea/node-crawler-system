import rp from "request-promise";
import { XICIDAILI_NN } from "../api";

const cheerio = require("cheerio");

const textProxy = "http://121.61.2.162:9999";

export function fetchLatestIp(page) {
  return rp({ url: XICIDAILI_NN(page), encoding: null, proxy: textProxy })
    .then(res => {
      console.log(res);
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

      return result.filter(ip => ip.anonymity === "高匿");
    })
    .catch(error => {
      console.log(error);
    });
}
