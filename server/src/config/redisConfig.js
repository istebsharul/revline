import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    tls:{
        rejectUnauthorized: false
    }
});

redis.on('connect', () => {
    console.log('Redis Connected');
});

redis.on('error', (err) => {
    console.error('Redis Connection Error:', err);
});

export default redis;
