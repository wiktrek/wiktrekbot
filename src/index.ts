import Eris from "eris"
import 'dotenv/config'
import msg from './events/messageCreate'
const client = new Eris.Client(process.env.TOKEN as string, {intents: [
"all"
]})
client.on("ready", () => {
  console.log("Ready!" + client.user.username);
});
msg.run(client);
client.connect()