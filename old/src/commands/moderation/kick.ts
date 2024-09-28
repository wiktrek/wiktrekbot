import {
  CommandInteraction,
  Constants,
  InteractionDataOptions,
  InteractionDataOptionsString,
  InteractionDataOptionsUser,
} from 'eris';
export default {
  name: 'kick',
  description: 'kick',
  options: [
    {
      name: 'target',
      description: 'User to kick',
      type: Constants.ApplicationCommandOptionTypes.USER,
      required: true,
    },
    {
      name: 'reason',
      description: 'reason',
      type: Constants.ApplicationCommandOptionTypes.STRING,
      required: false,
    },
  ],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptions[]
  ) => {
    const target = (args[0] as InteractionDataOptionsUser).value;

    if (!interaction.member?.permissions.has('kickMembers'))
      return interaction.createMessage({
        content: "You don't have the permissions to kick this user.",
      });
    if (interaction.member?.id === target) {
      return interaction.createMessage({ content: "You can't kick yourself." });
    }
    if (target === '960996823521189928' || target === '942891118201307156')
      return interaction.createMessage({ content: "You can't kick me" });
    if (args[1] === undefined) {
      interaction.member?.guild.members.get(target)?.kick();
      return interaction.createMessage({
        content: `<@${target}> got kicked.`,
      });
    }
    const reason = (args[1] as InteractionDataOptionsString).value;
    interaction.member?.guild.members.get(target)?.kick(reason);
    interaction.createMessage({
      content: `<@${target}> got kicked. Reason: ${reason}`,
    });
  },
};
