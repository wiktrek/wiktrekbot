import { Client, Message } from 'eris';
export default {
  name: 'messageCreate',
  run: async (client: Client) => {
    client.on('messageCreate', (msg) => {
      if (msg.content === 'test' && msg.author.id === '499665258038820866') {
        client.createMessage(
          msg.channel.id,
          `<@${msg.author.id}> ${msg.content}`
        );
      }
    });
  },
};
