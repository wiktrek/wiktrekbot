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
import { getMember } from '../../functions/getMember';

export default {
  name: 'steal',
  description: 'steal',
  cooldown: 10,
  options: [
    {
      required: true,
      name: 'member',
      description: 'steal from this member',
      type: Constants.ApplicationCommandOptionTypes.USER,
    },
  ],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptions[]
  ) => {
    const target = (args[0] as InteractionDataOptionsUser).value;

    let user_target = await MoneyModel.findOneAndUpdate({
      guildId: interaction.member?.guild.id,
      userId: target,
    }).exec();
    if (!user_target) {
      let Money = new MoneyModel({
        guildId: interaction.member?.guild.id,
        userId: target,
        money: 0,
      });
      await Money.save();
      return interaction.createMessage(
        `${getMember(target, interaction)} has no money`
      );
    }
    if (user_target.money <= 0)
      return interaction.createMessage(
        `You can't steal from ${getMember(user_target, interaction)}`
      );
    const low = 1;
    const max = user_target.money;

    const money = Math.floor(Math.random() * (max - low + 1) + low);
    console.log(money);
    await MoneyModel.findOneAndUpdate(
      {
        guildId: interaction.member?.guild.id,
        userId: interaction.member?.id,
      },
      {
        $inc: { money: money },
      }
    ).exec();
    await MoneyModel.findOneAndUpdate(
      {
        guildId: interaction.member?.guild.id,
        userId: target,
      },
      {
        $inc: { money: money * -1 },
      }
    ).exec();

    const embed: EmbedOptions = {
      title: `${interaction.member?.username}`,
      description: `You stole $${money} from ${
        getMember(target, interaction).username
      } `,
      color: 0x00d9c0,
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
