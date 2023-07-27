import { Client } from 'eris';
export default {
  name: 'messageCreate',
  run: async (client: Client) => {
    client.on('messageCreate', (msg) => {
      console.log(msg.content);
      if (msg.content === 'ping') {
        client.createMessage(msg.channel.id, 'Pong!');
      }
    });
  },
};
