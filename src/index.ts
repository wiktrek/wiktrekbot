import dotenv from "dotenv";
import { BotClient } from "./types/Client";
import { loadEvents } from "./handlers/eventHandler";

dotenv.config({path: ".env"});

const token = process.env.TOKEN;
if (!token) throw new Error("TOKEN is not set in .env");

const client = new BotClient(token, { intents: [
    "all",
] });

loadEvents(client);
client.connect();