import {
  CommandInteraction,
  EmbedOptions,
  InteractionDataOptionsString,
  Member,
} from 'eris';
import { MoneyModel } from '../../Schemas/money';
import interactionCreate from '~/events/interactionCreate';
interface leaderboard {
  member: string;
  money: number;
}
export default {
  name: 'leaderboard',
  description: 'leaderboard',
  //   cooldown: 30,
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    let users = await MoneyModel.find({
      guildId: interaction.member?.guild.id,
    }).exec();
    // console.log(users);
    if (!users) {
      return interaction.createMessage(
        'There are no members with money in this server'
      );
    }
    let members: leaderboard[] = [];
    users.map((user: any) => {
      members.push({
        money: user.money,
        member: getMember(user.userId, interaction).username,
      });
    });

    members.sort((a, b) => {
      return b.money - a.money;
    });
    let a = 0;
    const embed: EmbedOptions = {
      title: `${interaction.member?.guild.name}`,
      description: `${members.map((member) => {
        if (a > 10) return;
        a += 1;
        return `${a}.${member.member} ${member.money} \n`;
      })}`.replace(',', ' '),
      color: 0x00d9c,
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
function getMember(id: string, interaction: CommandInteraction): Member {
  let member = interaction.member?.guild.members.get(id);
  return member as Member;
}
