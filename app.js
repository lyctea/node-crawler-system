const express = require("express");
const R = require("ramda");
const resolve = require("path").resolve;
require("dotenv").config();
import SpiderTask from "./server/spiders/task";

const r = path => resolve(__dirname, path);
const MIDDLEWARES = ["database", "log"];

class Server {
  constructor() {
    this.app = new express();
    this.useMiddleWares(this.app)(MIDDLEWARES);
    this.startSpiderTask();
  }

  useMiddleWares(app) {
    return R.map(
      R.compose(
        R.map(i => i(app)),
        require,
        i => `${r("./server/middlewares")}/${i}`
      )
    );
  }

  startSpiderTask() {
    const spiderTask = new SpiderTask();
    // spiderTask.start();
  }

  start() {
    const port = process.env.PORT || 3000;

    const server = this.app.listen(port, () => {
      console.log("Express server listening on port " + server.address().port);
    });
  }
}

const server = new Server();
server.start();
