import { Client } from '../Client';
export default {
  name: 'ready',
  run: async (client: Client) => {
    client.on("ready", () => {
    console.log("Ready!" + client.user.username);
    client.editStatus("online", { name: `${client.guilds.size} servers`, type: 3 });
    console.log("Servers: " + client.guilds.size)
    const commands: String[] = []
client.commands.forEach((e, name) => {
if (name === "undefined") return;
  commands.push(name)
})

console.log("commands: \n" + commands)
})
  },
};

