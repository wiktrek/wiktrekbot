const {
  CommandInteraction,
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require('discord.js');
module.exports = {
  name: 'tutorial',
  description: 'tutorials',
  run: async (client, interaction) => {
    const {} = interaction;
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('tutorial')
        .setPlaceholder('Choose a tutorial')
        .addOptions([
          {
            label: ' how to use reaction-role/ panel command',
            value: 'panel',
            description: 'tutorial how to use reaction-roles',
          },
          {
            label: 'how to use filter command',
            value: 'filter',
            description: 'tutorial how to use filter command',
          },
          {
            label: 'how to setup tickets',
            value: 'ticket',
            description: 'tutorial how to setup tickets',
          },
        ])
    );
    interaction.followUp({
      content: 'here are some tutorials',
      components: [row],
    });
  },
};
