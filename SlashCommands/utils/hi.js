const Flags = require('discord.js')
module.exports = {
    name: "permissiontest",
    description: "permission test :D",
    userPerm: ["ADMINISTRATOR"],
    run: async (client, interaction, args) => {
        interaction.followUp({ content: "hello world"});
    },
}