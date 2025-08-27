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

tradeQueue.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export async function addTrade(trade) {
    await tradeQueue.add(trade);
}

tradeQueue.process(async (job) => {
    const { E, e, s, a, p, q, f, l, T, m, M } = job.data;

    batch.push({
        E: new Date(E),
        T: new Date(T),
        e: String(e),
        s: String(s),
        a: String(a),
        p: parseFloat(p),
        q: parseFloat(q),
        f: BigInt(f),
        l: BigInt(l),
        m: Boolean(m),
        M: Boolean(M)
    });

    if (batch.length >= BATCH_SIZE) {
        console.log('Buffer size:', batch.length);
        try {
            await prisma.trades.createMany({ data: batch, skipDuplicates: true });
            console.log('Batch processed immediately due to size limit', batch.length);
        } catch (error) {
            console.error('Error processing batch:', error);
        }
        finally {
            batch = [];
        }
    }
});