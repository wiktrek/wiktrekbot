import {
  CommandInteraction,
  Constants,
  InteractionDataOptions,
  InteractionDataOptionsString,
  InteractionDataOptionsUser,
} from 'eris';
export default {
  name: 'ban',
  description: 'ban',
  options: [
    {
      name: 'target', //The name of the option
      description: 'User to ban',
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

    if (interaction.member?.id === target) {
      return interaction.createMessage({ content: "You can't ban yourself." });
    }
    if (args[1] === undefined) {
      interaction.member?.guild.members.get(target)?.ban(0, '');
      return interaction.createMessage({
        content: `<@${target}> got banned.`,
      });
    }
    const reason = (args[1] as InteractionDataOptionsString).value;
    interaction.member?.guild.members.get(target)?.ban(0, reason);
    interaction.createMessage({
      content: `<@${target}> got banned. Reason: ${reason}`,
    });
  },
};
