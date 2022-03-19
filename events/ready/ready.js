const client = require('../../index');
module.exports = {
  name: 'readyEvent',
};
client.on('ready', () => {
  console.log(`${client.user.tag} is up and ready to go!`);
  client.user.setPresence({
    activities: [{ name: 'online!' }],
    status: 'online',
  });

  require('../../Systems/ChatFilterSys')(client);
});
