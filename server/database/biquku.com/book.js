import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  update_time: String,
  latest_chapter: String,
  num: Number,
  content: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    update: {
      type: Date,
      default: Date.now()
    }
  }
});

BookSchema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.update = Date.now();
  } else {
    this.meta.update = Date.now();
  }
  next();
});

BookSchema.statics = {
  async getBook(title) {
    const book = await this.findOne({
      title
    }).exec();

    return book;
  },

  async saveBook(data) {
    let book = await this.findOne({
      title: data.title
    }).exec();

    let result = null;

    if (book) {
      const newBook = Object.assign(book, data);
      result = await book.save(newBook);
    } else {
      book = new Book(data);
      result = await book.save(data);
    }
    return result;
  }
};

const Book = mongoose.model("biquku.com_Book", BookSchema);
module.exports = Book;
