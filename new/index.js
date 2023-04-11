const Eris = require('eris');
require('dotenv').config();
// Replace TOKEN with your bot account's token
const bot = new Eris(process.env['TOKEN'], {
  intents: ['guildMessages'],
});

bot.on('ready', () => {
  // When the bot is ready
  console.log('Ready!'); // Log "Ready!"
});

bot.on('error', (err) => {
  console.error(err); // or your preferred logger
});

bot.connect(); // Get the bot to connect to Discord
