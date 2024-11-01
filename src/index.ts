const dotenv = require("dotenv");
dotenv.config();
import { Events } from "discord.js";
import { ExtendedClient } from "./Client";
export const client = new ExtendedClient();
client.once(Events.ClientReady, (readyClient: { user: { tag: string } }) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.start();
