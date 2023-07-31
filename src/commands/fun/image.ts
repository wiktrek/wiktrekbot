import Eris, {
  CommandInteraction,
  Constants,
  InteractionDataOptions,
  InteractionDataOptionsString,
  InteractionDataOptionsUser,
} from 'eris';
import canvacord from 'canvacord';
export default {
  name: 'image',
  description: 'image',
  options: [
    {
      name: 'target', //The name of the option
      description: 'User to use',
      type: Constants.ApplicationCommandOptionTypes.USER,
      required: true,
    },
    {
      name: 'type',
      description: 'type',
      type: Constants.ApplicationCommandOptionTypes.STRING,
      required: true,
      choices: [
        {
          name: 'bed',
          value: 'bed',
        },
      ],
    },
    {
      name: 'target2', //The name of the option
      description: 'User to use',
      type: Constants.ApplicationCommandOptionTypes.USER,
      required: false,
    },
  ],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptions[]
  ) => {
    const target: string = (args[0] as InteractionDataOptionsUser).value;
    const choice: string = (args[1] as InteractionDataOptionsString).value;
    const target2 = args[2] as InteractionDataOptionsUser;
    const img1 = interaction.member?.guild.members.get(target)
      ?.avatarURL as string;
    let img2 =
      typeof target2 === 'undefined'
        ? (interaction.member?.avatarURL as string)
        : (interaction.member?.guild.members.get(target2.value)
            ?.avatarURL as string);

    switch (choice) {
      case 'bed':
        {
          const img = await canvacord.Canvacord.bed(img2, img1);
          interaction.createMessage(
            { content: '' },
            { name: 'e.png', file: img }
          );
        }
        break;
      case 'fuse':
        {
        }
        break;
    }
  },
};
