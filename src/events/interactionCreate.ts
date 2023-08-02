import {
  CommandInteraction,
  ComponentInteraction,
  ComponentInteractionSelectMenuData,
} from 'eris';
import { Client } from '../Client';
export default {
  name: 'interactionCreate',
  run: async (client: Client) => {
    client.on('interactionCreate', async (interaction) => {
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
      if (interaction instanceof ComponentInteraction) {
        if (
          interaction.data.component_type === 3 &&
          interaction.data.custom_id === 'helpMenu'
        ) {
          client.commands.forEach((options, name) => {
            if (
              (interaction.data as ComponentInteractionSelectMenuData)
                .values[0] === name
            ) {
              return interaction.createMessage(options.description);
            }
          });
        }
      }
    });
  },
};
