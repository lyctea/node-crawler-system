import { fetchCatalog, fetchChapters } from "./spider";

class BiqukuSpider {
  constructor() {}

  /*
   * 爬取目录
   * */
  async book() {
    const book = await fetchCatalog();
    // TODO 数据库写入
    this.chapters(book.chapters);
  }

  /*
   * 根据目录爬取具体的章节
   * */
  chapters(chapter) {
    fetchChapters(chapter);
  }

  async start() {
    this.book();
  }
}

export default BiqukuSpider;
