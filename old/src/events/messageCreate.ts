import { Client, Message } from 'eris';
export default {
  name: 'messageCreate',
  run: async (client: Client) => {
    client.on('messageCreate', (msg) => {
      if (msg.content === 'test' && msg.author.id === '499665258038820866') {
        return client.createMessage(
          msg.channel.id,
          `<@${msg.author.id}> ${msg.content}`
        );
      }
      if (msg.content === '<@942891118201307156>') {
        return client.createMessage(
          msg.channel.id,
          `<@942891118201307156> is online!`
        );
      }
      if (msg.content.toLowerCase().startsWith(`w!`)) {
        return client.createMessage(
          msg.channel.id,
          `<@942891118201307156> uses slash commands!`
        );
      }
    });
  },
};
