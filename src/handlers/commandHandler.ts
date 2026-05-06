import fs from "node:fs";
import path from "node:path";
import { BotClient} from "../types/Client";
import { Command } from "../types/Command";

function collectCommandFiles(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...collectCommandFiles(fullPath));
        } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".js"))) {
            files.push(fullPath);
        }
    }

    return files;
}

export async function loadCommands(client: BotClient  ) {
    const guildID = process.env.GUILD_ID!;
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = collectCommandFiles(commandsPath);
    const oldCmds = await client.getCommands();
    for (const cmd of oldCmds) {
        // console.log(cmd);
        await client.deleteCommand(cmd.id);
    }
    for (const file of commandFiles) {
        const commandFile = await import(file);
        const command: Command = commandFile.default || commandFile;
        command.category = path.relative(commandsPath, file).split(path.sep)[0] || "uncategorized";
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