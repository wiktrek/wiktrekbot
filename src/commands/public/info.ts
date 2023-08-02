import {
  CommandInteraction,
  EmbedOptions,
  InteractionDataOptionsString,
} from 'eris';
export default {
  name: 'info',
  description: 'Replies with info',
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const embed: EmbedOptions = {
      title: 'Wiktrekbot',
      description: '',
      fields: [
        {
          name: 'Languages',
          value: 'english',
        },
        {
          name: 'Source code',
          value: `[github/wiktrek/wiktrekbot](https://github.com/wiktrek/wiktrekbot)`,
        },
        {
          name: 'Programming languages',
          value: 'typescript',
        },
        {
          name: '',
          value: '',
        },
      ],
    };
    interaction.createFollowup({ embeds: [embed] });
  },
};
