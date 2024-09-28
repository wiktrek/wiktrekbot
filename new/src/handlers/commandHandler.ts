import { glob } from "glob";
import Table from "text-table";
import { Client, CommandData } from "../Client";
import { Collection, Events, GatewayIntentBits } from "discord.js";
interface Command {
  default: {
    name: string;
    description: string;
    cooldown?: number;
    options: any[];
    run: any;
  };
}
export async function commandHandler(client: Client) {
  const commandFiles = await glob("./src/commands/**/*.ts");
  // const commandFiles = readdirSync('./src/commands/').filter((f) =>
  //   f.endsWith('.ts')
  // );
  // console.log(commandFiles);
  for (const file of commandFiles) {
    const command: Command = await import(
      `${file.replace("\\", "/").replace("src", "..")}`
    );
    // If the command does not have a name and description provided it throws an error.
    if (!command.default.name) {
      throw new Error(`${file} needs to have a command.name!`);
    }
    if (!command.default.description) {
      throw new Error(`${file} needs to have a command.description!`);
    }
    const category = file
      .replace("\\", "/")
      .replace("src/commands/", "")
      .replace(`/${command.default.name}.ts`, "");
    const ccommand: CommandData = {
      category: category,
      description: command.default.description,
      options: command.default.options,
      run: command.default.run,
    };
    client.commands.set(command.default.name, ccommand);
    // client.commands.set(command.default.name, {
    //   description: command.default.description,
    //   options: command.default.options,
    //   category: category,
    //   cooldown: command.default.cooldown || 0,
    //   run: command.default.run,
    // });
  }
  const commands: string[][] = [];
  client.commands.forEach((e, name) => {
    if (name === "undefined") return;
    commands.push([name, `✅`]);
  });
  console.log("Commands:");
  const t = Table(commands);
  console.log(t);
}
