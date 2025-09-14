import fs from "node:fs";
import path from "node:path";
import { BotClient} from "../types/Client";
import { Command } from "../types/Command";

export function loadCommands(client: BotClient  ) {
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".ts") || f.endsWith(".js"));

    for (const file of commandFiles) {
        const command: Command = require(path.join(commandsPath, file));
        client.commands.set(command.name, command);
    }
}