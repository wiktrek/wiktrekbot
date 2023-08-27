import {
  CommandInteraction,
  EmbedOptions,
  InteractionDataOptions,
  InteractionDataOptionsString,
  Constants,
  InteractionDataOptionsUser,
  Member,
} from 'eris';
import { MoneyModel } from '../../Schemas/money';
export default {
  name: 'give',
  description: 'give money',
  cooldown: 10,
  options: [
    {
      required: true,
      name: 'member',
      description: 'Give money to a user',
      type: Constants.ApplicationCommandOptionTypes.USER,
    },
    {
      name: 'amount',
      description: 'amount of money you want to give',
      type: Constants.ApplicationCommandOptionTypes.NUMBER,
      required: true,
    },
  ],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptions[]
  ) => {
    const target = (args[0] as InteractionDataOptionsUser).value;
    const money: number = Number(
      (args[1] as InteractionDataOptionsString).value
    );

    if (money <= 0)
      return interaction.createMessage(
        "You can't give negative amount of money"
      );
    let user = await MoneyModel.findOne({
      guildId: interaction.member?.guild.id,
      userId: interaction.member?.id,
    }).exec();
    if (user.money < money) {
      return interaction.createMessage("You don't have enough money.");
    }
    let user_target = await MoneyModel.findOneAndUpdate(
      {
        guildId: interaction.member?.guild.id,
        userId: target,
      },
      {
        $inc: { money: money },
      }
    ).exec();
    await MoneyModel.findOneAndUpdate(
      {
        guildId: interaction.member?.guild.id,
        userId: interaction.member?.id,
      },
      {
        $inc: { money: money * -1 },
      }
    ).exec();
    if (!user_target) {
      let Money = new MoneyModel({
        guildId: interaction.member?.guild.id,
        userId: target,
        money: money,
      });
      await Money.save();
    }
    const embed: EmbedOptions = {
      title: `${interaction.member?.username}`,
      description: `You gave ${
        getMember(target, interaction).username
      } $${money}`,
      color: 0x069e2d,
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
function getMember(id: string, interaction: CommandInteraction): Member {
  let member = interaction.member?.guild.members.get(id);
  return member as Member;
}
