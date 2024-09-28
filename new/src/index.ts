import { Collection, Events, GatewayIntentBits } from "discord.js";
import { Client } from "./Client";
require("dotenv").config();
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.commands = new Collection();
// Log in to Discord with your client's token
client.login(process.env.TOKEN!);
