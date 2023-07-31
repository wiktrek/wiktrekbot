import {
  CommandInteraction,
  InteractionDataOptionsString,
  Guild,
  EmbedOptions,
} from 'eris';
export default {
  name: 'serverinfo',
  description: 'server info',
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const { memberCount, name, createdAt, iconURL, channels } = interaction
      .member?.guild as Guild;
    const embed: EmbedOptions = {
      title: name,
      color: 0x069e2d,
      author: {
        name: name,
        icon_url: iconURL as string,
      },
      fields: [
        {
          name: `members`,
          value: `${memberCount}`,
        },
        {
          name: `Channels`,
          value: `${channels.size}`,
        },
      ],
      footer: {
        // Footer text
        text: 'wiktrekbot',
      },
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
