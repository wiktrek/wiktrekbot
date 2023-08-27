import { CommandInteraction, Member } from 'eris';

export function getMember(id: string, interaction: CommandInteraction): Member {
  let member = interaction.member?.guild.members.get(id);
  return member as Member;
}
