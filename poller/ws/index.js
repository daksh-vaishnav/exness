import WebSocket from 'ws';
import { addTrade } from '../queue/index.js';
// import { publishTrade } from '../publisher/index.js';
// import { createTradeQueue } from './queue/queue.js';
import dotenv from 'dotenv';
dotenv.config();

const ASSET = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "XRPUSDT", "SOLUSDT"]
const WS_SERVER = process.env.WS_SERVER

const URL = WS_SERVER + ASSET.map(a => a.toLowerCase() + '@aggTrade').join('/')

const ws = new WebSocket(URL);

ws.onopen = () => {
  console.log("connected to WS server");
};

ws.onmessage = async (event) => {
  const data = JSON.parse(event.data);
  const trade = data.data
  addTrade(trade);
  publishTrade(trade);
};

ws.onclose = () => {
  console.log("disconnected from WS server");
};

ws.onerror = (err) => {
  console.error("WS error:", err);
};
