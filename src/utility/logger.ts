import winston from "winston"



const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}] ${message}`;
        })
    ),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
})

export function log(type: "info" | "warn" | "error" = "info", message: string) {
    switch (type) {
        case "info":
            logger.info(message)
            break
        case "warn":
            logger.warn(message)
            break
        case "error":
            logger.error(message)
            break
    }
}