import { fetchCatalog, fetchChapters } from "./spider";
import mongoose from "mongoose";
require("../../database/biquku.com/book");

const Book = mongoose.model("biquku.com_Book");

class BiqukuSpider {
  constructor() {}

  /*
   * 爬取全书，目录、title等
   * */
  async book() {
    const book = await fetchCatalog();
    await Book.saveBook(book);
    this.chapters(book.chapters);
  }

  /*
   * 根据目录爬取具体的章节
   * */
  chapters(chapter) {
    fetchChapters(chapter);
  }

  async start() {
    await this.book();
  }
}

export default BiqukuSpider;
