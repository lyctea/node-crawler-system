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
  // async getUsableProxy() {
  // }

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
