const express = require("express");
const { scheduleController } = require("../controllers");

const router = express.Router();

router.route("/").get(scheduleController.getSchedule);

module.exports = router;
