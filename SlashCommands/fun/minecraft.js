const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'minecraft',
  description: 'check minecraft name history',
  options: [
    {
      name: 'username',
      description: 'your minecraft username',
      type: 'STRING',
      required: true,
    },
  ],
  /**
   *
   *@param {CommandInteraction} interaction
   */
  run: async (client, interaction, args) => {
    const embed = new MessageEmbed();
    const n = interaction.options.getString('username');
    const a = [];
    const nicknames = [];
    await fetch(`https://api.mojang.com/users/profiles/minecraft/${n}`)
      .then((response) => response.json())
      .then((data) => {
        a.push(data.id);
      })
      .catch((error) => {
        throw error;
      });
    await fetch(`https://api.mojang.com/user/profiles/${a}/names`)
      .then((response) => response.json())
      .then((data) => {
        let a = 0;
        data.forEach((d) => {
          a = a + 1;
          if (!d.changedToAt) return nicknames.push(`${a}.${d.name} `);
          nicknames.push(
            `${a}.${d.name} <t:${parseInt(d.changedToAt / 1000)}:R> `
          );
        });
      })
      .catch((error) => {
        throw error;
      });
    embed
      .setColor('#00FFFF')
      .setDescription(`${n}'s nickname history`)
      .addField(`nicknames:`, `${nicknames.join('\n')}`, true);
    interaction.followUp({ embeds: [embed] });
  },
};
