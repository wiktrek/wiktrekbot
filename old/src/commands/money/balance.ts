import {
  CommandInteraction,
  Constants,
  EmbedOptions,
  InteractionDataOptions,
  InteractionDataOptionsUser,
} from 'eris';
import { MoneyModel } from '../../Schemas/money';
import { getMember } from '../../functions/getMember';
export default {
  name: 'balance',
  description: 'Check your balance',
  cooldown: 10,
  options: [
    {
      required: false,
      name: 'member',
      description: 'Give money to a user',
      type: Constants.ApplicationCommandOptionTypes.USER,
    },
  ],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptions[]
  ) => {
    const target = (args[0] as InteractionDataOptionsUser).value;
    if (!target) {
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
    }
    let user = await MoneyModel.findOne({
      guildId: interaction.member?.guild.id,
      userId: target,
    }).exec();
    if (!user) {
      let Money = new MoneyModel({
        guildId: interaction.member?.guild.id,
        userId: target,
        money: 0,
      });
      await Money.save();
    }
    const embed: EmbedOptions = {
      title: `${getMember(target, interaction).username}`,
      description: `${getMember(target, interaction).username} has $${
        user.money
      }`,
      color: 0x00d9c0,
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
