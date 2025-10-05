import { Event } from "../types/Event";
import { BotClient } from "../types/Client";

const ready: Event = {
    name: "ready",
    once: true,
    async execute(client: BotClient) {
        console.log(`Bot is ready! Logged in as ${client.user?.username}`);
    },
};

export default ready