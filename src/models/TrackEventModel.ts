import { Document, Schema, model } from "mongoose";

export interface TrackEvent {
    event: string;
    tags?: string[];
    url: string;
    title: string;
    ts: number;
}

interface TrackEventDocument extends TrackEvent, Document {}

const TrackEventSchema = new Schema<TrackEventDocument>(
    {
        event: { type: String, required: true },
        tags: { type: [String] },
        url: { type: String, required: true },
        title: { type: String, required: true },
        ts: { type: Number, required: true },
    },
    { versionKey: false }
);

export default model<TrackEventDocument>(
    "TrackEvent",
    TrackEventSchema,
    "tracks"
);
