import {
  CommandInteraction,
  EmbedOptions,
  InteractionDataOptionsString,
} from 'eris';
import { MoneyModel } from '../../Schemas/money';

export default {
  name: 'balance',
  description: 'Check your balance',
  cooldown: 10,
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    let user = await MoneyModel.findOne({
      guildId: interaction.member?.guild.id,
      userId: interaction.member?.id,
    }).exec();
    if (!user) {
      let Money = new MoneyModel({
        guildId: interaction.member?.guild.id,
        userId: interaction.member?.id,
        money: 0,
      });
      await Money.save();
    }
    const embed: EmbedOptions = {
      title: `${interaction.member?.username}`,
      description: `You have $${user.money}`,
      color: 0x00d9c0,
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
