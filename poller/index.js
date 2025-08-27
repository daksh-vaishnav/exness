import WebSocket from 'ws';
import { addTrade } from './queue/index.js';
import { publishTrade } from './publisher/index.js';
// import { createTradeQueue } from './queue/queue.js';
import dotenv from 'dotenv';
dotenv.config();

const WS_SERVER = process.env.WS_SERVER;

const ws = new WebSocket(WS_SERVER);
// const tradeQueue = createTradeQueue();

ws.onopen = () => {
  console.log("✅ Connected to server");
};

ws.onmessage = async (event) => {
  console.log("📩 Message from server");
  const trades = JSON.parse(event.data);
  // addTrade(trades);
  publishTrade(trades);
};

ws.onclose = () => {
  console.log("❌ Disconnected from server");
};

ws.onerror = (err) => {
  console.error("⚠️ WebSocket error:", err);
};
