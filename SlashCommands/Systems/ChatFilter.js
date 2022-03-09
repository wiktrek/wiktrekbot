const { CommandInteraction, Client } = require('discord.js');
const { off } = require('../../models/FilterDB');
const Schema = require('../../models/FilterDB');

module.exports = {
  name: 'filter',
  description: 'A simple chat filter system',
  UserPerm: ['MENAGE_MESSAGES'],
  options: [
    {
      name: 'settings',
      description: 'Setup your filtering system',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'logging',
          description: 'select the logging channel',
          type: 'CHANNEL',
          channelTypes: ['GUILD_TEXT'],
          required: true,
        },
      ],
    },
    {
      name: 'configure',
      description: 'add or remove words from the balcklist',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'options',
          description: 'select an option',
          type: 'STRING',
          required: true,
          choices: [
            {
              name: 'Add',
              value: 'add',
            },
            {
              name: 'Remove',
              value: 'remove',
            },
          ],
        },
        {
          name: 'word',
          description:
            'Provide the word, add multiple words by placing a comman in between (word,anotherword)',
          type: 'STRING',
          required: true,
        },
      ],
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  run: async (client, interaction) => {
    const { guild, options } = interaction;
    const subCommand = options.getSubcommand();
    switch (subCommand) {
      case 'settings':
        const loggingChannel = options.getChannel('logging').id;
        await Schema.findOneAndUpdate(
          { Guild: guild.id },
          { Log: loggingChannel },
          { new: true, upsert: true }
        );
        client.filtersLog.set(guild.id, loggingChannel);
        interaction.channel.send({
          content: `added <#${loggingChannel}>`,
          ephemeral: true,
        });
        break;
      case 'configure':
        const Choices = options.getString('options');
        const Words = options.getString('word').toLowerCase().split(',');
        switch (Choices) {
          case 'add':
            Schema.findOne({ Guild: guild.id }, async (err, data) => {
              if (err) throw err;
              if (!data) {
                await Schema.create({
                  Guild: guild.id,
                  Log: null,
                  Words: Words,
                });

                client.filters.set(guild.id, Words);

                return interaction.channel.send({
                  content: `Added ${Words.length} new words(s) to the blacklist`,
                });
              }
              const newWords = [];
              Words.forEach((w) => {
                if (data.Words.includes(w)) return;
                newWords.push(w);
                data.Words.push(w);
                client.filters.get(guild.id).push(w);
              });

              interaction.channel.send({
                content: `Added ${newWords.length} new word(s) to the blacklist`,
              });

              data.save();
            });
            break;
          case 'remove':
            Schema.findOne({ Guild: guild.id }, async (err, data) => {
              if (err) throw err;
              if (!data) {
                return interaction.channel.send({
                  content: `There is no data to remove!`,
                });
              }

              const removedWords = [];

              Words.forEach((w) => {
                if (!data.Words.includes(w)) return;
                data.Words.remove(w);
                removedWords.push(w);
              });

              const newArray = client.filters
                .get(guild.id)
                .filter((word) => !removedWords.includes(word));

              client.filters.set(guild.id, [newArray]);

              interaction.channel.send({
                content: `Removed ${removedWords.length} word(s) from the blacklist`,
              });
            });
            break;
        }
        break;
    }
  },
};
