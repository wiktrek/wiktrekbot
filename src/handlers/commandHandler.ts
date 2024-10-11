import { Client } from "../Client";
import { glob } from "glob";
import Table from "text-table";
export async function commandHandler(client: Client) {
  const commandFiles = await glob("./src/commands/**/*.ts");
  for (const file of commandFiles) {
    const command = await import(
      `${file.replaceAll("\\", "/").replace("src", "..")}`
    );
    // If the command does not have a name and description provided it throws an error.
    if (!command.default.data.name) {
      throw new Error(`${file} needs to have a command.name!`);
    }
    if (!command.default.data.description) {
      throw new Error(`${file} needs to have a command.description!`);
    }
    const category = file
      .replaceAll("\\", "/")
      .replace("src/commands/", "")
      .replace(`/${command.default.name}.ts`, "");
    client.commands.set(command.default.data.name, command.default);
  }
  const commands: string[][] = [];
  client.commands.forEach((e: any, { name }: { name: string }) => {
    if (name === "undefined") return;
    commands.push([name, `✅`]);
  });
  console.log("Commands:");
  const t = Table(commands);
  console.log(t);
}
