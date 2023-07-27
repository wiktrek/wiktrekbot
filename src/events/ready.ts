import { Client } from "../Client";
import Table from "text-table";
export default {
  name: "ready",
  run: async (client: Client) => {
    client.on("ready", () => {
      client.editStatus("online", {
        name: `${client.guilds.size} servers`,
        type: 3,
      });
      console.log("Servers: " + client.guilds.size);
      const commands: string[][] = [];
      client.commands.forEach((e, name) => {
        if (name === "undefined") return;
        commands.push([`  ${name}`, "✅"]);
      });
      console.log("Commands:");
      const t = Table(commands);
      console.log(t);
    });
  },
};
