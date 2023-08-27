import {
  CommandInteraction,
  EmbedOptions,
  InteractionDataOptionsString,
} from 'eris';
import { MoneyModel } from '../../Schemas/money';
export default {
  name: 'crime',
  description: 'crime',
  cooldown: 10,
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const low = -150;
    const max = 200;

    const random = Math.floor(Math.random() * (max - low + 1) + low);
    let user = await MoneyModel.findOneAndUpdate(
      {
        guildId: interaction.member?.guild.id,
        userId: interaction.member?.id,
      },
      {
        $inc: { money: random },
      }
    ).exec();
    if (!user) {
      let Money = new MoneyModel({
        guildId: interaction.member?.guild.id,
        userId: interaction.member?.id,
        money: random,
      });
      await Money.save();
    }
    const embed: EmbedOptions = {
      title: `${interaction.member?.username}`,
      description: `You committed a crime and got $${random}!`,
      color: 0x00d9c,
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
