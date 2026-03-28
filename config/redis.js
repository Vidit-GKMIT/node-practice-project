const redis = require("redis");
const logger = require("../logger/config.logger");
const client = redis.createClient();

async function connectRedis() {
  try {
    await client.connect();
    logger.info({msg: "Redis connected successfully...!!"});
  } catch (error) {
    logger.error({msg: "Redis connection failed:", error});
    process.exit(1); // stop the server if DB not connected
  }
}

connectRedis();
module.exports = client;
