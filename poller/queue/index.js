import Queue from 'bull';
import { prisma } from '../prisma/prismaClient.js';


const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const BATCH_SIZE = process.env.BATCH_SIZE || 20;

let batch = []


console.log('Queue connected to Redis at', REDIS_HOST + ':' + REDIS_PORT);

const tradeQueue = new Queue('trade-queue', {
    redis: { host: REDIS_HOST, port: REDIS_PORT },
});


tradeQueue.on('ready', () => {
    console.log('Redis is connected and queue is ready');
    console.log({ REDIS_HOST, REDIS_PORT, BATCH_SIZE });

});

// Log connection errors
tradeQueue.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// Example function to enqueue trades
export async function addTrade(trade) {
    await tradeQueue.add(trade); // Push job into Redis
}

// addTrade({ symbol: 'AAPL', price: 189.50, volume: 10 });
tradeQueue.process(async (job) => {
    batch.push(job.data);
    console.log('Buffer size:', batch.length);
    // If we reached batch size, flush immediately
    if (batch.length >= BATCH_SIZE) {
        console.log('Processing batch');

        batch.map(async (items) => {
            items = items.map((item) => ({
                eventTime: new Date(item.E),       // convert timestamp to BigInt
                symbol: item.s,
                close: item.c,
                open: item.o,
                high: item.h,
                low: item.l,
                volume: item.v,
                quoteVol: item.q,
            }));
            const res = await prisma.miniTicker.createMany({ data: items, skipDuplicates: true });
            console.log('Batch processed immediately due to size limit.', res);
        })
        batch = [];
    }
});