import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config({});

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

console.log({ REDIS_HOST, REDIS_PORT });


// Create a Redis client for publishing
const subscriber = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
});



subscriber.subscribe('trade', (err, data) => {
    if (err) {
        console.error("Error subscribing to trade channel:", err);
    } else {
        console.log("Subscribed to trade channel:", data);
    }
});

// subscriber.on("message", (channel, message) => {
//     console.log(`Received ${message} from ${channel}`);
// });

// subscriber.on("messageBuffer", (channel, message) => {
//     console.log(channel, message);
// });