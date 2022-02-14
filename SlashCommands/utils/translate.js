const { Client, CommandInteraction } = require('discord.js')
const translate = require('@iamtraction/google-translate')
module.exports = {
    name: 'translate',
    description: 'translate',
    options: [ 
    {       
        name: 'text',       
        description: 'text to translate',
        type: 'STRING',
        required: true
    },
    {
        name: "languagefrom",
        description: 'language to translate',
        type: 'STRING',
        required: true
    },
    {
    name: "languageto",
    description: 'language to translate',
    type: 'STRING',
    required: true
    }
],
run:async(client,interaction,args) => {
    const text = interaction.options.getString('text')
    const language = interaction.options.getString('languagefrom')
    const language2 = interaction.options.getString('languageto')
    const translated = await translate(text, {from: `${language}`,to:`${language2}`})
    interaction.followUp({content: `${translated.text}`})
}
}