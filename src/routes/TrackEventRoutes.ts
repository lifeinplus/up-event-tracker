import express from "express";

import {
    serveTrackerScript,
    trackEvent,
} from "../controllers/TrackEventController";

const router = express.Router();

router.get("/tracker", serveTrackerScript);
router.post("/track", trackEvent);

export = router;
