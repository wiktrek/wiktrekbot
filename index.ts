import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () =>{
    console.log(".")
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping')
    message.channel.send({ content: 'WIKTREKBOT DZIALA EZ'})
})

client.login(process.env.TOKEN)