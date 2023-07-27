import { CommandInteraction } from 'eris';
import { Client } from '../Client';
export default {
  name: 'interactionCreate',
  run: async (client: Client) => {
    client.on('interactionCreate', (interaction) => {
      if (interaction instanceof CommandInteraction) {
        if (interaction.guildID == undefined) {
          interaction.createMessage('You cannot run commands outside of guild');
          return;
        }
        const commandName = interaction.data.name;
        const args = interaction.data.options;

        const command = client.commands.get(commandName);
        // console.log(command);
        if (command === undefined)
          return interaction.createMessage(
            "Couldn't find command '" + commandName
          );
        command.run(interaction, args);
      }
    });
  },
};
