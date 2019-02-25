import rp from "request-promise";
import { XICIDAILI_NN } from "../api";

const cheerio = require("cheerio");

export function fetchLatestIp(page) {
  return rp({ url: XICIDAILI_NN(page), encoding: null })
    .then(res => {
      const $ = cheerio.load(res);

      const ipList = $("#ip_list tr").slice(3);

      let result = [];
      ipList.each((i, elem) => {
        const tr = $(elem).children();
        const ip = tr.eq(1).text();
        const port = tr.eq(2).text();
        const httpType = tr
          .eq(5)
          .text()
          .toLowerCase();

        result.push(`${httpType}://${ip}:${port}`);
      });

      return result;
    })
    .catch(error => {
      // console.log(error);
    });
}
