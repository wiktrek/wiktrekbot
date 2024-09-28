import { Client as DiscordClient } from "discord.js";
export interface CommandData {
  description: string;
  options: any[];
  category: string;
  cooldown?: number;
  run: any;
}
export interface Cooldown {
  user: string;
  command: string;
  time: number;
  timestamp: number;
}
export class Client extends DiscordClient {
  commands: Map<string, CommandData>;
  cooldown: Cooldown[];
}
