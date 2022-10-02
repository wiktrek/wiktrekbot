const { loadCommands } = require('../../handlers/commandHandler');
module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    loadCommands(client);
  },
};
