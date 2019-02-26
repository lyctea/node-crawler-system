import mongoose from "mongoose";
import { resolve } from "path";
import { recursionRequireFile } from "../util/tool";

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const dbUrl = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// // 引入 schema
const models = resolve(__dirname, "../database");
recursionRequireFile(models);

const mongoOptions = {
  useNewUrlParser: true,
  poolSize: 1,
  socketOptions: {
    auto_reconnect: true
  }
};

export const database = app => {
  mongoose.set("debug", true);

  mongoose.connect(dbUrl, mongoOptions);

  mongoose.connection.on("error", err => {
    console.error(err);
  });

  mongoose.connection.on("open", async => {
    console.log("✅ Connected MongoDB Success");
  });
};
