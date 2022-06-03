const client = require('../../index');
module.exports = {
  name: 'MessageCreateEvent',
};

client.on('messageCreate', async (message) => {
  if (message.author.id === '499665258038820866') {
    if (message.content === 'wiktrekbot test') {
      message.channel.send('Working!');
    }
  }
  if (message.content === '<@942891118201307156>') message.channel.send('Hi!');
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(client.config.prefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return;
  await command.run(client, message, args);
});
