import "dotenv/config";
import { eventHandler } from "./handlers/eventHandler";
import { commandHandler } from "./handlers/commandHandler";
import { Client } from "./Client";
const client = new Client(process.env.TOKEN as string, { intents: ["all"] });
commandHandler(client);
eventHandler(client);
client.connect();
