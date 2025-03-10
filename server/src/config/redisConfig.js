import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const redisUrl = 'rediss://red-csrmv856l47c73fhpie0:u6VbnJmFS8GfD7wuuhRh2aWdQHc0MBFa@oregon-keyvalue.render.com:6379';

if (!redisUrl) {
  console.error("🚨 Missing EXTERNAL_REDIS_URL. Set it in your environment variables.");
  process.exit(1);
}

const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null, // Helps prevent unexpected reconnections
  enableReadyCheck: false, // Avoids connection errors
});

redis.on("connect",(err)=>{
    console.log("Redis Connected Successfully")
})

redis.on("error", (err) => {
  console.error("🚨 Redis Connection Error:", err);
});

export default redis;
