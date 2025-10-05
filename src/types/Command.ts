import { CommandInteraction, ApplicationCommandOptions} from "eris";
import { BotClient } from "./Client";
/*
    Idk if this is correct
*/

export interface Command {
    name: string;
    description: string;
    options?: ApplicationCommandOptions[];
    execute: (client: BotClient, interaction: CommandInteraction) => Promise<void>;
}