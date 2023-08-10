const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug");
require("./models/Problem");
require("./models/User");
require("./models/Offer");
require("./models/Message");
require("./models/Review");
const cors = require("cors");
const csurf = require("csurf");
const { isProduction } = require("./config/keys");

const usersRouter = require("./routes/api/users");
const problemsRouter = require("./routes/api/problems");
const csrfRouter = require("./routes/api/csrf");
const testUserRouter = require("./routes/api/test");
const offersRouter = require("./routes/api/offers");
const messagesRouter = require("./routes/api/messages");
const reviewsRouter = require("./routes/api/reviews");

require("./config/passport");
const passport = require("passport");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



if (!isProduction) {
  // Enable CORS only in development because React will be on the React
  // development server (http://localhost:3000). (In production, React files
  // will be served statically on the Express server.)
  const corsOptions = {
    origin: 'http://localhost:3000',
  };
  app.use(cors(corsOptions));

}

app.use(passport.initialize());

// CSRF token
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// Attach Express routers
app.use("/api/users", usersRouter);
app.use("/api/problems", problemsRouter);
app.use("/api/offers", offersRouter);
app.use("/api/csrf", csrfRouter);
app.use("/api/test", testUserRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/reviews", reviewsRouter);

if (isProduction) {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  app.get('/', (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
}

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug("backend:error");

// Express custom error handler that will be called whenever a route handler or
// middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors,
  });
});

module.exports = app;