import fs from "node:fs";
import path from "node:path";
import { BotClient } from "../types/Client";
import { Event } from "../types/Event";

export async function loadEvents(client: BotClient) {
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".ts") || f.endsWith(".js"));

    for (const file of eventFiles) {
        const event: Event = await import(path.join(eventsPath, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }
        client.events.set(event.name, event);
    }
}