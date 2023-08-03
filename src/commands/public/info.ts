import {
  CommandInteraction,
  EmbedOptions,
  InteractionDataOptionsString,
} from 'eris';
import { client } from '../../index';
export default {
  name: 'info',
  description: 'Replies with info',
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const embed: EmbedOptions = {
      title: 'wiktrekbot',
      description: '',
      color: 0xff00ff,
      fields: [
        {
          name: 'website',
          value: '[wiktrek.xyz](https://wiktrek.xyz)',
        },
        {
          name: 'Languages',
          value: 'english',
        },
        {
          name: 'Source code',
          value: `[github/wiktrek/wiktrekbot](https://github.com/wiktrek/wiktrekbot)`,
        },
        {
          name: 'Commands',
          value: `${client.commands.size}`,
        },
      ],
    };
    interaction.createFollowup({ embeds: [embed] });
  },
};
