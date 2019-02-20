import rp from "request-promise";
import { afterDecode } from "../util/parse";
import mongoose from "mongoose";

require("../../database/biquku.com/chapters");
const Chapter = mongoose.model("biquku.com_Chapter");

import { BIQUKU_CATALOG_URL, BIQUKU_CHAPTERS_URL } from "../api";

function fetchCatalog() {
  return rp({ url: BIQUKU_CATALOG_URL, encoding: null })
    .then(res => {
      const $ = afterDecode(res);
      let current_book = {};

      current_book.title = $("#maininfo h1").text();
      current_book.author = $("#info p")
        .eq(0)
        .text();
      current_book.update_time = $("#info p")
        .eq(2)
        .text();
      current_book.latest_chapter = $("#info p a")
        .eq(3)
        .text();
      current_book.intro = $("#intro").html();

      current_book.chapters = [];
      const urls = $("#list a");
      for (let i = 0; i < urls.length; i++) {
        // TODO 只爬取5条信息
        if (i === 5) break;

        const url = urls[i];
        const _url = $(url).attr("href") + "";
        const num = _url.replace(".html", "");
        const title = $(url).text();

        current_book.chapters.push({
          num: num,
          title: title,
          url: _url
        });
      }

      return current_book;
    })
    .catch(err => {
      console.log(err);
    });
}

function fetchChapters(chapters = []) {
  chapters.forEach(chapter => fetchOne(chapter));
}

/**
 * 爬取具体章节
 * @param chapter 章节信息
 */
function fetchOne(chapter) {
  console.log(chapter);
  rp({ url: BIQUKU_CHAPTERS_URL(chapter.num), encoding: null })
    .then(res => {
      const $ = afterDecode(res);
      const content = $("#content").html();
      // TODO 写入数据库
      Chapter.saveChapter({ ...chapter, content });
    })
    .catch(err => {
      console.log(err);
    });
}

export { fetchCatalog, fetchChapters };
