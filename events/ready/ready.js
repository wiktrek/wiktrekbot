const client = require('../../index');
module.exports = {
  name: 'readyEvent',
};
client.on('ready', () =>
  console.log(`${client.user.tag} is up and ready to go!`)
);
