import { Request, Response } from "express";
import fs from "fs";
import path from "path";

import EventModel, { TrackEvent } from "../models/TrackEventModel";

interface TrackEventRequest extends Request {
    body: { data: string[] | string };
}

export async function serveTrackerScript(req: Request, res: Response) {
    try {
        const scriptPath = path.join(
            __dirname,
            "..",
            "..",
            "dist",
            "library",
            "EventTracker.js"
        );

        const script = await fs.promises.readFile(scriptPath, "utf-8");

        res.setHeader("Content-Type", "application/javascript");
        res.send(script);
    } catch (error) {
        console.error("Error loading tracker script:", error);
        res.status(500).json({ error: "Failed to serve script" });
    }
}

export const trackEvent = (req: TrackEventRequest, res: Response) => {
    const data = req.body.data;

    // if encoded data has only one element, then it comes as a string
    const encoded = typeof data === "string" ? [data] : data;

    if (!Array.isArray(encoded) || !encoded.length) {
        return res.sendStatus(422);
    }

    const events: TrackEvent[] = encoded.map((item) => JSON.parse(item));

    try {
        EventModel.insertMany(events);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error inserting into database:", error);
        res.status(422).json({ error: "Failed to track events" });
    }
};
