const express = require("express");
const { sequelize } = require("./models");
require("dotenv").config();
const client = require("./config/redis"); // redis client
const routes = require("./routes/index.route");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.all("/health", async (_req, res) => {
  try {
    const results = await sequelize.query("SELECT NOW() as current_time");
    const currentTime = results[0][0].current_time; // [[{current_time}],....]
    const ping = await client.ping();
    const date = new Date();

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
