const redis = require("redis");
const client = redis.createClient();

async function connectRedis() {
  try {
    await client.connect();
    console.log("Redis connected successfully...!!");
  } catch (error) {
    console.error("Redis connection failed:", error);
    process.exit(1); // stop the server if DB not connected
  }
}

connectRedis();
module.exports = client;
