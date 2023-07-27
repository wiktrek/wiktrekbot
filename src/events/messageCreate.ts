import { Client, Message } from "eris";
export default {
  name: "messageCreate",
  run: async (client: Client) => {
    client.on("messageCreate", (msg) => {
      console.log(msg.content);
    });
  },
};
