import {
  ActionRow,
  CommandInteraction,
  InteractionDataOptionsString,
  SelectMenuOptions,
} from 'eris';
import { client } from '../../index';
import { CommandData } from '../../Client';
export default {
  name: 'help',
  description: 'help',
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const commands: SelectMenuOptions[] = [];
    client.commands.forEach((cmd, n) => {
      commands.push({
        label: n,
        value: n,
      });
    });
    const component: ActionRow = {
      type: 1,
      components: [
        {
          type: 3,
          custom_id: 'helpMenu',
          options: commands,
        },
      ],
    };
    interaction.createMessage({ components: [component] });
  },
};
