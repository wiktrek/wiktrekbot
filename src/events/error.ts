import { Event } from "../types/Event";
import { BotClient } from "../types/Client";

const error: Event = {
    name: "error",
    async execute(client: BotClient, error: Error) {
        console.error(error);
    },
};

export default error;