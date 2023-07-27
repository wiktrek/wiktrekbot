import { CommandInteraction, InteractionDataOptionsString} from 'eris'
export default {
    name: "ping",
    description: "Pong!",
    run: async (interaction: CommandInteraction,  args: InteractionDataOptionsString[]) => {
    console.log("Pong!")
    interaction.createFollowup({content: "Pong!"})
    }
}