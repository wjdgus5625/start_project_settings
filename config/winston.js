import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const logDir = "logs";
const { combine, timestamp, printf } = winston.format;

// Define log format
const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/info",
      filename: `%DATE%.log`,
      maxFiles: 30, 
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error", 
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    })
  ]
});

// Production 환경이 아닌 경우(dev 등)
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat
      )
    })
  );
}

const stream = {
  write: (message) => {
    logger.info(message.replace(/\n/, ''));
  },
};

export { logger, stream };