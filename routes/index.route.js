const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");
const addressRoutes = require("./address.route");

router.use("/users", userRoutes);
router.use("/addresses", addressRoutes);

module.exports = router;
