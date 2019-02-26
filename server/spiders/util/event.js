const events = require("events");
const emitter = new events.EventEmitter();

const PROXY_ALREADY = "proxy_already"; // 代理池准备就绪，可以开始爬虫任务

export { emitter, PROXY_ALREADY };
