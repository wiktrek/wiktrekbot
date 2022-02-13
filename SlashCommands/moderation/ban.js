const { Client, CommandInteraction } = require('discord.js')
module.exports = {
    name: 'ban',
    description: 'ban a member',
    userPerm: ["BAN_MEMBERS"],
    options: [ 
        {
            name: 'target',
            description: 'target to ban',
            type: 'USER',
            required: true
    },
    {        name: 'reason',       description: 'reason for this ban',
        type: 'STRING',
        required: false
    }
],
    run: async(client, interaction, args) => {
        const target = interaction.options.getMember('target')
        const reason = interaction.options.getString('reason'|| "No reason provided")


        if(target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({ content: 'you cant take action on this user as their role is higher than yours'})
    await target.send(`You have been banned from ${interaction.guild.name}, reason: ${reason}`)
    target.ban({reason})
    interaction.followUp({ content: `Banned ${target.user.tag} successfully! reason: ${reason}` })
    }
}