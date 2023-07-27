import { CommandInteraction, Client } from 'eris';
import { readdirSync } from 'fs';
interface Command {
  name: string;
  run: any;
}
export const commands: Command[] = [];

export default {
  name: 'ready',
  run: async (client: Client) => {
    client.on('ready', async () => {
      console.log('ready!');
    });
  },
};
