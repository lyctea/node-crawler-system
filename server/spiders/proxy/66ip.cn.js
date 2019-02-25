import rp from "request-promise";
import { WWW_66IP_CN } from "../api";
const cheerio = require("cheerio");

function fetch_proxy_66cn() {
  return rp(WWW_66IP_CN).then(res => {
    const $ = cheerio.load(res);
    const result = $("body")
      .html()
      .split("<br>")
      .splice(0, 200);

    return result.map(ip => "https://" + ip.toString().trim());
  });
}

export default fetch_proxy_66cn;
