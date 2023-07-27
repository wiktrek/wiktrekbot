import { Client as DiscordClient, ClientOptions } from 'eris';
export interface CommandData {
  description: string;
  options: any[];
  run: any;
}
export class Client extends DiscordClient {
  commands: Map<string, CommandData>;
  constructor(token: string, options = <ClientOptions>{}) {
    super(token, options);
    this.commands = new Map();
  }
}
