import {
  type ApplicationCommandDataResolvable,
  Client,
  type ClientEvents,
  Collection,
} from "discord.js";
import type { CommandType as Command } from "./typings/Command";
import { glob } from "glob";
import { promisify } from "util";
import type { Event } from "./structures/Event";
export interface RegisterCommandsOptions {
  guildId?: string;
  commands: ApplicationCommandDataResolvable[];
}
const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: Collection<string, Command> = new Collection();

  constructor() {
    super({ intents: 32767 });
  }

  start() {
    this.registerModules();
    this.login(process.env.TOKEN);
  }
  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(`Registering commands to ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      console.log("Registering global commands");
    }
  }

  async registerModules() {
    // Commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise(
      `${__dirname}/commands/*/*{.ts,.js}`,
      {}
    );
    (commandFiles as any).forEach(async (filePath: any) => {
      const command: Command = await this.importFile(filePath);
      if (!command.name) return;
      console.log(command);

      this.commands.set(command.name, command);
      slashCommands.push(command);
    });

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.guildId,
      });
    });

    // Event
    const eventFiles = await globPromise(`${__dirname}/events/*{.ts,.js}`, {});
    (eventFiles as any).forEach(async (filePath: any) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    });
  }
}
