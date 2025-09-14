import { CommandInteraction } from "eris";
import { BotClient } from "./Client";

export interface Command {
    name: string;
    description: string;
    options?: any[];
    execute: (client: BotClient, interaction: CommandInteraction) => Promise<void>;
}