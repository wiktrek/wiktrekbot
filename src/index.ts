const dotenv = require("dotenv");
dotenv.config();
import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.once(Events.ClientReady, (readyClient: { user: { tag: string } }) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.login(process.env.TOKEN);
