const dotenv = require("dotenv");
dotenv.config();
import { Client } from "./Client";
import { Events, GatewayIntentBits, Collection } from "discord.js";
const client = new Client();
client.once(Events.ClientReady, (readyClient: { user: { tag: string } }) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.start();
