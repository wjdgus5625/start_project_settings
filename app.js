require("dotenv").config();

import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import server from "./routes/index.server.routes";
import { logger, stream } from "./config/winston";

const app = express();

app.use(morgan("dev", { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

server(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  let apiError = err;

  if (!err.status) {
    apiError = createError(err);
  }

  if (process.env.NODE_ENV === "test") {
    const errObj = {
      req: {
        headers: req.headers,
        query: req.query,
        body: req.body,
        route: req.route,
      },
      error: {
        message: apiError.message,
        stack: apiError.stack,
        status: apiError.status,
      },
    };
    logger.error(JSON.stringify(errObj));
  } else {
    res.locals.message = apiError.message;
    res.locals.error = apiError;
    logger.error(apiError.message);
  }

  // render the error page
  res.status(apiError.status || 500).json({ message: apiError.message });
});

// bin/www를 그대로 사용하기 위해서 예외적으로 commonJS 문법 적용
module.exports = app;
