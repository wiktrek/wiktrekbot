import { Client } from '../Client';
import Eris, { Constants } from 'eris';
import { readdirSync } from 'fs';
interface Command {
  default: {
    name: string;
    description: string;
    options: any[];
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

    client.commands.set(command.default.name, {
      description: command.default.description,
      options: command.default.options,
      run: command.default.run,
    });

    // console.log(command.default);

    // console.log(await client.getCommands());
    // client.deleteCommand('1026159446931550273');

    // client.createCommand({
    //   name: command.default.name,
    //   description: command.default.description,
    //   options: command.default.options,
    // type: Constants.ApplicationCommandTypes.CHAT_INPUT,
    // });
  }
}