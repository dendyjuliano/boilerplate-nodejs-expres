# Nodejs Express base API

This is a boilerplate application for building REST APIs in Node.js using ES6, Express and PostgreSQL.

## Getting Started

### Installation

1. Clone the repository with `https://github.com/dendyjuliano/boilerplate-nodejs-expres.git`
2. Install the dependencies with `yarn install` (click here if [you don't have Yarn installed](https://yarnpkg.com/getting-started/install)
3. Setup the database on `src/config/postgres.js` and config information on `env.example`

### Scripts

This boilerplate comes with a collection of npm scripts to make your life easier, you'll run them with `npm run <script name>` or `yarn <script name>`:

- `start`: Run the application in development mode

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--db\
  |--migrations\    # Database migrations
  |--models\        # Database models
  |--seeders\       #
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--app.js          # App entry point \ Express app
```

## Database

This app uses [Sequelize](https://sequelize.org/) - an **Object-Relational Mapper** to maps object syntax into Postgres database, and [Sequelize CLI](https://github.com/sequelize/cli) package to manage sequelize.

There are 2 ways to run `sequelize-cli`.

```bash
# Method 1: Use sequelize global
npm install -g sequelize-cli

sequelize db:migrate

# Method 2
node_modules/.bin/sequelize db:migrate
```

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require("../utils/catchAsync");

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error("Something wrong happened");
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
// user.controller.js
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  res.send({ user });
});
```
