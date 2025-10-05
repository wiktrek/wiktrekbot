import { Event } from "../types/Event";
import { BotClient } from "../types/Client";

const error: Event = {
    name: "error",
    once: true,
    async execute(error) {
        console.log(error)
    },
};
export default error