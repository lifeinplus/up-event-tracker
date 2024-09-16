import { NextFunction, Request, Response } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(
        `[${new Date().toLocaleString()}] Method: [${req.method}] - URL: [${
            req.url
        }]`
    );

    res.on("finish", () => {
        console.log(
            `[${new Date().toLocaleString()}] Method: [${req.method}] - URL: [${
                req.url
            }] - Status: [${res.statusCode}]`
        );
    });

    next();
};

export default requestLogger;
