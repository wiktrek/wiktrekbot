const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const ms = require('ms');
module.exports = {
  name: 'giveaway',
  description: 'A complete giveaway system',
  userPerm: ['ADMINISTRATOR'],
  options: [
    {
      name: 'start',
      description: 'start a giveaway',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'duration',
          description: 'Provide a duration for this giveaway (1m, 1h, 1d)',
          type: 'STRING',
          required: true,
        },
        {
          name: 'winners',
          description: 'select the amount of winners for this giveaway',
          type: 'INTEGER',
          required: true,
        },
        {
          name: 'prize',
          description: 'provide the name of the prize',
          type: 'STRING',
          required: true,
        },
        {
          name: 'channel',
          description: 'Select a channel to send the giveaway to',
          type: 'CHANNEL',
          channelTypes: ['GUILD_TEXT'],
          required: true,
        },
      ],
    },
    {
      name: 'actions',
      description: 'Options for giveaways',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'options',
          description: 'select an option ',
          type: 'STRING',
          required: true,
          choices: [
            {
              name: 'end',
              value: 'end',
            },
            {
              name: 'unpause',
              value: 'unpause',
            },
            {
              name: 'pause',
              value: 'pause',
            },
            {
              name: 'reroll',
              value: 'reroll',
            },
            {
              name: 'delete',
              value: 'delete',
            },
          ],
        },
        {
          name: 'message-id',
          description: 'provide the message id of the giveaway',
          type: 'STRING',
          required: true,
        },
      ],
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const { options } = interaction;
    const Sub = options.getSubcommand();
    const errorEmbed = new MessageEmbed().setColor('RED');
    const successEmbed = new MessageEmbed().setColor('GREEN');

    switch (Sub) {
      case 'start':
        {
          const gchannel = options.getChannel('channel') || interaction.channel;
          const duration = options.getString('duration');
          const winnerCount = options.getInteger('winners');
          const prize = options.getString('prize');
          client.giveawaysManager
            .start(gchannel, {
              duration: ms(duration),
              winnerCount,
              prize,
              messages: {
                giveaway: '🎉 **GIVEAWAY STARTED** 🎉',
                giveAwayEnded: '🎉 **GIVEAWAY ENDED** 🎉',
              },
            })
            .then(async () => {
              successEmbed.setDescription('Giveaway was successfully started.');
              interaction.channel.send({ embeds: [successEmbed] });
            })
            .catch((err) => {
              errorEmbed.setDescription(`an error has occurred\n\`${err}\``);
              interaction.channel.send({ embeds: [errorEmbed] });
            });
        }
        break;
      case 'actions': {
        const choice = options.getString('options');
        const messageId = options.getString('message-id');
        const giveaway = client.giveawaysManager.giveaways.find(
          (g) => g.guildId === interaction.guildId && g.prize === messageId
        );
        if (!giveaway) {
        }

        switch (choice) {
          case 'end':
            {
              client.giveawaysManager
                .end(messageId)
                .then(() => {
                  successEmbed.setDescription('Giveaway has been ended');
                  interaction.channel.send({ embeds: [successEmbed] });
                })
                .catch((err) => {
                  errorEmbed.setDescription(
                    `An error has occurred\m\`${err}\``
                  );
                  interaction.channel.send({ embeds: [errorEmbed] });
                });
            }
            break;
          case 'pause':
            {
              client.giveawaysManager
                .pause(messageId)
                .then(() => {
                  successEmbed.setDescription('Giveaway has been paused');
                  interaction.channel.send({ embeds: [successEmbed] });
                })
                .catch((err) => {
                  errorEmbed.setDescription(
                    `An error has occurred\m\`${err}\``
                  );
                  interaction.channel.send({ embeds: [errorEmbed] });
                });
            }
            break;
          case 'unpause':
            {
              client.giveawaysManager
                .unpause(messageId)
                .then(() => {
                  successEmbed.setDescription('Giveaway has been unpaused');
                  interaction.channel.send({ embeds: [successEmbed] });
                })
                .catch((err) => {
                  errorEmbed.setDescription(
                    `An error has occurred\m\`${err}\``
                  );
                  interaction.channel.send({ embeds: [errorEmbed] });
                });
            }
            break;
          case 'reroll':
            {
              client.giveawaysManager
                .reroll(messageId)
                .then(() => {
                  successEmbed.setDescription('Giveaway has been rerolled');
                  interaction.channel.send({ embeds: [successEmbed] });
                })
                .catch((err) => {
                  errorEmbed.setDescription(
                    `An error has occurred\m\`${err}\``
                  );
                  interaction.channel.send({ embeds: [errorEmbed] });
                });
            }
            break;
          case 'delete':
            {
              client.giveawaysManager
                .delete(messageId)
                .then(() => {
                  successEmbed.setDescription('Giveaway has been deleted');
                  interaction.channel.send({ embeds: [successEmbed] });
                })
                .catch((err) => {
                  errorEmbed.setDescription(
                    `An error has occurred\m\`${err}\``
                  );
                  interaction.channel.send({ embeds: [errorEmbed] });
                });
            }

            break;

          default: {
            console.log('Error on giveaway command');
          }
        }
      }
    }
  },
};
