import { TrackEvent } from "../models/TrackEventModel";

interface Tracker {
    track(event: string, ...tags: string[]): void;
}

class EventTracker implements Tracker {
    private eventBuffer: TrackEvent[] = [];
    private isSending: boolean = false;
    private endpoint: string = "http://localhost:8888/track";

    constructor() {
        window.addEventListener(
            "visibilitychange",
            this.sendRemainingEvents.bind(this)
        );
    }

    public track(event: string, ...tags: string[]) {
        const eventEntry: TrackEvent = {
            event,
            tags,
            url: window.location.href,
            title: document.title,
            ts: Math.floor(Date.now() / 1000),
        };

        this.eventBuffer.push(eventEntry);

        if (this.eventBuffer.length >= 3) {
            this.flushBuffer();
        } else {
            setTimeout(() => this.flushBuffer(), 1000);
        }
    }

    private async flushBuffer() {
        if (this.isSending || !this.eventBuffer.length) {
            return;
        }

        this.isSending = true;

        const eventsToSend = this.eventBuffer.splice(0);
        const encodedToSend = this.encodeEvents(eventsToSend);

        try {
            const res = await fetch(this.endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: encodedToSend,
            });

            if (!res.ok) {
                throw new Error("Failed to send");
            }
        } catch (error) {
            console.error("Failed to send, retrying...", error);
            this.eventBuffer.push(...eventsToSend);
            setTimeout(() => this.flushBuffer(), 1000);
        } finally {
            this.isSending = false;
        }
    }

    private sendRemainingEvents() {
        if (
            document.visibilityState === "hidden" &&
            this.eventBuffer.length > 0 &&
            navigator.sendBeacon
        ) {
            const eventsToSend = this.eventBuffer.splice(0);
            const encodedToSend = this.encodeEvents(eventsToSend);

            const blobToSend = new Blob([encodedToSend], {
                type: "application/x-www-form-urlencoded",
            });

            navigator.sendBeacon(this.endpoint, blobToSend);
        }
    }

    // The Content-Type header 'application/x-www-form-urlencoded'
    // doesn’t trigger a preflight request. So I manually serialize
    // the data to use this instead of 'application/json'.
    private encodeEvents(events: TrackEvent[]) {
        return events
            .map((event) => `data=${encodeURIComponent(JSON.stringify(event))}`)
            .join("&");
    }
}

(window as any).tracker = new EventTracker();
