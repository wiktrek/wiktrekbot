import { Collection, Client as DiscordClient } from "discord.js";
import type { Command } from "./typings/Command";
export class Client extends DiscordClient {
  commands: Collection<string, Command> = new Collection();
  constructor() {
    super({ intents: 32767 });
  }
  start() {
    this.login(process.env.TOKEN);
  }
}
