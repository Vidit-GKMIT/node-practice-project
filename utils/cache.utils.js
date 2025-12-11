require("dotenv").config();
const client = require("../config/redis");

const getCache = async (key) => {
  const data = await client.get(key);
  return data;
};

const setCache = async (key, data) => {
  await client.set(key, JSON.stringify(data), {
    EX: `${parseInt(process.env.REDIS_TTL)}`
  });
};

const deleteCache = async (prefix) => {
  const pattern = `${prefix}*`;
  client.keys(pattern, (err, keys) => {
    for (let i = 0; i < keys.length; i++) {
      client.unlink(keys[i]);
    }
  });
};

module.exports = { getCache, setCache, deleteCache };
