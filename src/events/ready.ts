import { Client } from '../Client';

import { CommandData } from '../Client';
import { ApplicationCommandStructure, Constants } from 'eris';
export default {
  name: 'ready',
  run: async (client: Client) => {
    client.on('ready', () => {
      registerCommands(client);
      client.editStatus('online', {
        name: `${client.guilds.size} servers`,
        type: 3,
      });
      console.log('Servers: ' + client.guilds.size);
    });
  },
};
function registerCommands(client: Client) {
  const commands: ApplicationCommandStructure[] = [];
  client.commands.forEach((data: CommandData, name) => {
    if (name === 'undefined') return;
    commands.push({
      name,
      description: data.description,
      options: data.options,
      type: Constants.ApplicationCommandTypes.CHAT_INPUT,
    });
  });
  client.bulkEditCommands(commands);
}
