import { Eris } from 'eris';
const bot = new Eris('BOT_TOKEN');
bot.on('ready', () => {
  console.log('Ready!');
});
bot.on('messageCreate', (msg) => {
  if (msg.content === '!ping') {
    bot.createMessage(msg.channel.id, 'Pong!');
  }
});
bot.connect();
