import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
  title: String,
  url: String,
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

ChapterSchema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.update = Date.now();
  } else {
    this.meta.update = Date.now();
  }
  next();
});

ChapterSchema.statics = {
  async getChapter(title) {
    const chapter = await this.findOne({
      title
    }).exec();

    return chapter;
  },

  async saveChapter(data) {
    let chapter = await this.findOne({
      title: data.title
    }).exec();

    let result = null;

    if (chapter) {
      const newBook = Object.assign(chapter, data);
      result = await chapter.save(newBook);
    } else {
      chapter = new Chapter(data);
      result = await chapter.save(data);
    }
    return result;
  }
};

const Chapter = mongoose.model("biquku.com_Chapter", ChapterSchema);
module.exports = Chapter;
