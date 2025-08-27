import Redis from 'ioredis';

// Create a Redis client for publishing
const publisher = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

export const publishTrade = async (trade) => {
    try {
        await publisher.publish('trade', JSON.stringify(trade));
        console.log("Published trade");
    } catch (err) {
        console.error("Error publishing trade:", err);
    }
}