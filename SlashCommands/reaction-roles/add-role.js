const rrModel = require('../../models/reactionRoles')
const { Client , CommandInteraction} = require('discord.js')

module.exports = {
    name: 'add-role',
    description: 'add a custom reaction role',
    userPermissions: ['MANAGE_ROLES'],
    options: [
        {
            name: 'role',
            description: 'role to be assigned',
            type: 'ROLE',
            required: true
        },
        {
            name: 'description',
            description: 'description of this role',
            type: 'STRING',
            required: false
        },
        {
        name: 'emoji',
        description: 'emoji for the role',
        type: 'STRING',
        required: false
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        const role = interaction.options.getRole("role")
        const roleDescription = interaction.options.getString("description") || null
        const roleEmoji = interaction.options.getString("emoji") || null

        if (role.position >= interaction.guild.me.roles.highest.position) return interaction.followUp("I can't assgn a role that is higher or equal than me")
        const guildData = await rrModel.findOne({ guildId: interaction.guildId })

        const newRole = { 
            roleId: role.id,
            roleDescription: roleDescription,
            roleEmoji,
        }

        if(guildData) {
            const roleData = GuildData.roles.find((x) => x.roleId === role.id)
            if(roleData) {
                roleData = newRole
            } else {
                guildData.roles = [...guildData.roles, newRole]
            }

            await guildData.save()
        } else {
            await rrModel.create({
                guildId: interaction.guildId,
                roles: newRole
            })
        }

        interaction.followUp(`Created a new role: ${role.name}`)
    }
}