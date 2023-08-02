import { Client } from '../Client';
import Eris, { Constants } from 'eris';
const { glob } = require('glob');
import Table from 'text-table';
interface Command {
  default: {
    name: string;
    description: string;
    options: any[];
    run: any;
  };
}
export async function commandHandler(client: Client) {
  const commandFiles = await glob('./src/commands/**/*.ts');
  // const commandFiles = readdirSync('./src/commands/').filter((f) =>
  //   f.endsWith('.ts')
  // );
  // console.log(commandFiles);
  for (const file of commandFiles) {
    const command: Command = await import(
      `${file.replaceAll('\\', '/').replace('src', '..')}`
    );
    // If the command does not have a name and description provided it throws an error.
    if (!command.default.name) {
      throw new Error(`${file} needs to have a command.name!`);
    }
    if (!command.default.description) {
      throw new Error(`${file} needs to have a command.description!`);
    }
    const category = file
      .replaceAll('\\', '/')
      .replace('src/commands/', '')
      .replace(`/${command.default.name}.ts`, '');
    client.commands.set(command.default.name, {
      description: command.default.description,
      options: command.default.options,
      category: category,
      run: command.default.run,
    });
  }
  const commands: string[][] = [];
  client.commands.forEach((e, name) => {
    if (name === 'undefined') return;
    commands.push([name, e.category, `✅`]);
  });
  console.log('Commands:');
  const t = Table(commands);
  console.log(t);
}
