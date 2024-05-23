const catchAsync = require("../utils/catchAsync");

const getSchedule = catchAsync(async (req, res) => {
  res.send("Hello words im get Schedule");
});

module.exports = {
  getSchedule,
};
