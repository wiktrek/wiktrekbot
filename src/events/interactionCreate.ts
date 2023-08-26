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
        if (command === undefined)
          return interaction.createMessage(
            "Couldn't find command '" + commandName
          );
        let memberId = interaction.member?.id as string;

        // return interaction.createMessage('Cooldown');
        const hasCooldown = client.cooldown.map((c, i) => {
          let timestamp = c.timestamp + (command.cooldown || 0) * 1000;
          if (c.command === commandName && c.user === memberId) {
            if (timestamp < Date.now()) {
              client.cooldown.splice(i, 1);
              return false;
            }
            interaction.createMessage(
              `You can ${commandName} <t:${timestamp
                .toString()
                .slice(0, -3)}:R>`
            );
            return true;
          }

          return false;
        });

        if (hasCooldown.includes(true)) return;
        if (command.cooldown) {
          client.cooldown.push({
            command: commandName,
            user: memberId,
            time: command.cooldown,
            timestamp: Date.now(),
          } as Cooldown);
        }
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
