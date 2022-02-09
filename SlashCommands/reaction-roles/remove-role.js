const rrModel = require('../../models/reactionRoles')
const {Client, CommandInteraction} = require('discord.js')

module.exports = {
    name: 'remove-role',
    description: 'remove a custom reaction role',
    userPerm: ['MANAGE_ROLES'],
    options: [
         {
        name: 'role',
        description: 'role to be removed',
        type: 'ROLE',
        required: true
    }
],
run: async (client, interaction) => {
const role = interaction.options.getRole("role")

const guildData = await rrModel.findOne({ guildId: interaction.guildId })

if(!guildData) return interaction.followUp('there is no roles inside of this server!')

const guildRoles = guildData.roles;
const findRole = guildRoles.find(x => x.roleId === role.id);
if(!findRole) return interaction.followUp('that role is not added to the reaction roles list')

const filteredRoles = guildRoles.filter(x => x.roleId !== role.id)
guildData.roles = filteredRoles;
await guildData.save();


interaction.followUp(`Removed: ${role.name}`)
}
}