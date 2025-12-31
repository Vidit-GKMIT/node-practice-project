const express = require("express");
const { sequelize } = require("./models");
require("dotenv").config();
const client = require("./config/redis"); // redis client
const routes = require("./routes/index.route");
const logger = require('./logger/config.logger')
const {v4: uuidv4} = require('uuid')
const {generateLogId} = require('./middleware/logger.middleware')

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(generateLogId);

app.all("/health", async (_req, res) => {
  try {
    const results = await sequelize.query("SELECT NOW() as current_time");
    const currentTime = results[0][0].current_time; // [[{current_time}],....]
    const ping = await client.ping();
    const date = new Date();
    const id = uuidv4();
    logger.info({msg: "Server running successfully...!!", id});

    res.send({
      message: "Server running successfully...!!",
      databaseTime: currentTime,
      redis: ping,
      date: date
    });
  } catch (error) {
    console.log("Error in connecting to server", error);
  }
});

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
