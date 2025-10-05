import fs from "node:fs";
import path from "node:path";
import { BotClient} from "../types/Client";
import { Command } from "../types/Command";
export async function loadCommands(client: BotClient  ) {
    const guildID = process.env.GUILD_ID!;
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".ts") || f.endsWith(".js"));

    for (const file of commandFiles) {
        const commandFile = await import(path.join(commandsPath, file));
        const command: Command = commandFile.default || commandFile;
        client.commands.set(command.name, command);
        try {
            await client.createGuildCommand(guildID, {
                name: command.name,
                description: command.description,
                options: command.options || [],
            });
        } catch (err) {
            console.error(`Failed to register command ${command.name}:`, err);
        }
    }

}