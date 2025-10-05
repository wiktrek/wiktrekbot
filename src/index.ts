import dotenv from "dotenv";
import { BotClient } from "./types/Client";
import { loadCommands } from "./handlers/commandHandler";
import { loadEvents } from "./handlers/eventHandler";

dotenv.config({path: ".env"});

const token = process.env.TOKEN;
if (!token) throw new Error("DISCORD_TOKEN is not set in .env");

const client = new BotClient(token, { intents: [] });

loadCommands(client);
loadEvents(client);
client.connect();