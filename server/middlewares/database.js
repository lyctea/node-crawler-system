import mongoose from "mongoose";

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const dbUrl = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const mongoOptions = {
  server: {
    poolSize: 1,
    socketOptions: {
      auto_reconnect: true
    }
  }
};

export const database = app => {
  mongoose.set("debug", true);

  mongoose.connect(dbUrl, mongoOptions);

  mongoose.connection.on("error", err => {
    console.error(err);
  });

  mongoose.connection.on("open", async => {
    console.log("Connected to MongoDB Success", DB_NAME);
  });
};
