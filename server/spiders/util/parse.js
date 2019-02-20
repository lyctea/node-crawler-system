const cheerio = require("cheerio");
const iconv = require("iconv-lite");

export const afterDecode = res =>
  cheerio.load(iconv.decode(res, "gb2312"), { decodeEntities: false });
