import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProxySechema = new Schema({
  ip: { type: String, require: true, unique: true },
  port: { type: String, require: true },
  anonymity: { type: String, require: true },
  httpType: { type: String, require: true },
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

ProxySechema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.update = Date.now();
  } else {
    this.meta.update = Date.now();
  }
  next();
});

ProxySechema.statics = {
  /**
   * find 可用的 proxy
   * @param index 按插入时间排序，取对应下标数据
   * @returns {Promise<void>}
   */
  async getUsableProxy(index) {
    try {
      const proxy = await this.find({})
        .sort("meta.createAt")
        .skip(index)
        .limit(1)
        .exec();
      return proxy;
    } catch (e) {
      console.log(e);
    }
  },

  async saveProxy(proxys) {
    try {
      await this.insertMany(proxys, { ordered: false });
    } catch (e) {
      console.log(e);
    }
  }
};

const Proxy = mongoose.model("xicidaili.com_Proxy", ProxySechema);
module.exports = Proxy;
