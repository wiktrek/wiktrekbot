import { CommandInteraction } from "eris";
import { BotClient } from "./Client";
/*
    Idk if this is correct
*/
export interface Options {
    name: string;
    description: string;
    type: number;
    required?: boolean;
    choices?: { name: string; value: string | number }[];
    options?: Options[];
}
export interface Command {
    name: string;
    description: string;
    options?: Options[];
    execute: (client: BotClient, interaction: CommandInteraction) => Promise<void>;
}