const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
require("dotenv").config();
const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
  partials: [User, Message, GuildMember, ThreadMember],
});
const { loadEvents } = require("./handlers/eventHandler");
const { connect } = require("mongoose");
const env = process.argv[2] || "dev";
client.subCommands = new Collection();
client.commands = new Collection();
client.events = new Collection();
client.guildConfig = new Collection();
connect(process.env.DB, { dbName: "wiktrekbot" }).then(() =>
  console.log("connected to mongoDB")
);

loadEvents(client);
const { loadConfig } = require("./functions/configLoader");
loadConfig(client);
console.log(client.commands);
client
  .login(env == "dev" ? process.env["TEST_TOKEN"] : process.env["TOKEN"])
  .then(() => {
    client.user.setActivity(`with ${client.guilds.cache.size} servers`);
  })

  .catch((err) => console.log(err));
