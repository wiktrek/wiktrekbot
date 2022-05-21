const AsciiTable = require('ascii-table');
const { glob } = require('glob');
const { promisify } = require('util');
const { Client } = require('discord.js');
const mongoose = require('mongoose');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
const CommandTable = new AsciiTable('Commands').setHeading('Command', 'status');
const EventTable = new AsciiTable('Events').setHeading('Event', 'status');
module.exports = async (client) => {
  // Commands
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split('/');
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  });

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*/*.js`);

  eventFiles.map((value) => {
    require(value);
    const file = require(value);
    EventTable.addRow(file.name, '✅');
  });
  // Slash Commands
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];

  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);
    CommandTable.addRow(file.name, '✅');
    if (['MESSAGE', 'USER'].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  client.on('ready', async () => {
    await client.application.commands.set(arrayOfSlashCommands);
    // await client.guilds.cache
    //   .get('846267160938283048')
    //   .commands.set(arrayOfSlashCommands);
    console.log(CommandTable.toString());
    console.log(EventTable.toString());
  });

  // mongoose
  const { mongooseConnectionString } = require('./../config.json');
  if (!mongooseConnectionString) return;

  mongoose
    .connect(mongooseConnectionString)
    .then(() => console.log('Connected to mongodb'));
};
