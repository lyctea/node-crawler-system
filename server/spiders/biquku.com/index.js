import { fetchCatalog, fetchChapters } from "./spider";
import mongoose from "mongoose";

class BiqukuSpider {
  /*
   * 爬取全书，目录、title等
   * */
  async book() {
    const book = await fetchCatalog();
    await this.BookSchema.saveBook(book);
    this.chapters(book.chapters);
  }

  /*
   * 根据目录爬取具体的章节
   * */
  chapters(chapter) {
    fetchChapters(chapter);
  }

  async start() {
    this.BookSchema = mongoose.model("biquku.com_Book");
    await this.book();
  }
}

export default BiqukuSpider;
