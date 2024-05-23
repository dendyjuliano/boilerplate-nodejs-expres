const express = require("express");
const routes = require("./routes");
const models = require("./db/models");
const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");
const cors = require("cors");
const helmet = require("helmet");
const { postgres } = require("./config/postgres");

models.sequelize.sync();
const app = express();
const PORT = process.env.PORT;

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// connect to postgres database
app.use((req, _, next) => {
  req.postgres = postgres;
  next();
});

app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  } else console.log("Error occurred, server can't start", error);
});
