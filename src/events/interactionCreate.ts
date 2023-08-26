import {
  CommandInteraction,
  ComponentInteraction,
  ComponentInteractionSelectMenuData,
  EmbedOptions,
} from 'eris';
import { Client, Cooldown } from '../Client';
export default {
  name: 'interactionCreate',
  run: async (client: Client) => {
    client.on('interactionCreate', async (interaction) => {
      if (interaction instanceof CommandInteraction) {
        await interaction.defer();
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
        let memberId = interaction.member?.id as string;
        if (command.cooldown) {
          console.log('COOLDOWN');
        }
        if (
          client.cooldown.includes({
            command: commandName,
            user: memberId,
          } as Cooldown)
        )
          return interaction.createMessage('Cooldown');
        // return interaction.createMessage('Cooldown');
        console.log(client.cooldown);
        const hasCooldown = client.cooldown.map((c) => {
          if (c.command === commandName && c.user === memberId) {
            interaction.createMessage('COOLDOWN');
            return true;
          }

          return false;
        });
        console.log(hasCooldown);
        if (hasCooldown.includes(true)) return;
        client.cooldown.push({
          command: commandName,
          user: memberId,
          time: command.cooldown,
        } as Cooldown);
        command.run(interaction, args);
      }

      if (interaction instanceof ComponentInteraction) {
        await interaction.deferUpdate();
        if (
          interaction.data.component_type === 3 &&
          interaction.data.custom_id === 'helpMenu'
        ) {
          client.commands.forEach((options, name) => {
            if (
              (interaction.data as ComponentInteractionSelectMenuData)
                .values[0] === name
            ) {
              const embed: EmbedOptions = {
                title: name,
                color: 0x3366ff,
                fields: [
                  {
                    name: 'description',
                    value: options.description,
                  },
                  {
                    name: 'category',
                    value: options.category,
                  },
                ],
              };
              return interaction.createFollowup({ embeds: [embed] });
            }
          });
        }
      }
    });
  },
};
