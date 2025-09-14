import { BotClient } from "./Client";

export interface Event {
    name: string;
    once?: boolean;
    execute: (client: BotClient, ...args: any[]) => Promise<void>;
}