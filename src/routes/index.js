const express = require("express");
const scheduleRoute = require("./schedule.route");

const router = express.Router();

router.use("/schedule", scheduleRoute);

module.exports = router;
