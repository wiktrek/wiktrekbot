import { Client } from '../Client';
import { readdirSync } from 'fs';
interface Command {
  default: {
    name: string;
    description: string;
    run: any;
  };
}
export async function commandHandler(client: Client) {
  const commandFiles = readdirSync('./src/commands/').filter((f) =>
    f.endsWith('.ts')
  );
  for (const file of commandFiles) {
    const command: Command = await import(`../commands/${file}`);
    // If the command does not have a name and description provided it throws an error.
    if (!command.default.name) {
      throw new Error(`${file} needs to have a command.name!`);
    }
    if (!command.default.description) {
      throw new Error(`${file} needs to have a command.description!`);
    }

    client.commands.set(command.default.name, command.default.run);
  }
}
