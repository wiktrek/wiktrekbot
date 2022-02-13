const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
module.exports = {
    name: 'clear',
    description: 'deletes a specified number of messages from a channel or a target',
    userPerm: ["MENAGE_MESSAGES"],
    options: [{
        name: "amount",
        description: "Selet the amount of messages to delete from this channel or target",
        type: "NUMBER",
        required: true
    },
{
    name: "target",
    description: "Select a target to delete their messages",
    type: "USER",
    required: false
}
],
run:async (client,interaction,args) => {
    const amount = interaction.options.getNumber("amount")
    const target = interaction.options.getMember("target")

    const Messages = await interaction.channel.messages.fetch()



    if(target) {
        let i = 0
        const filtered = [];
        (await Messages).filter((m) => {
            if(m.author.id === target.id && amount > i) {
                filtered.push(m)
                i++;
            }
        })

        await interaction.channel.bulkDelete(filtered, true).then(messages => {
            
            interaction.channel.send({ content: `🧹 Cleared ${messages.size} from ${target}.`})
        })

    } else {
        await interaction.channel.bulkDelete(amount, true)
            .then(messages => {
                interaction.channel.send({ content: `🧹 Cleared ${messages.size} from this channel.`})
    })
}
}
}