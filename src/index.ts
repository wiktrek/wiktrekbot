import Eris from "eris"
import 'dotenv/config'
import { eventHandler }from './handlers/eventHandler'
const client = new Eris.Client(process.env.TOKEN as string, {intents: [
"all"
]})
client.on("ready", () => {
  console.log("Ready!" + client.user.username);
});
eventHandler(client)
client.connect()