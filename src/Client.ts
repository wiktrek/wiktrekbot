import { Client as DiscordClient, ClientOptions } from 'eris';
export class Client extends DiscordClient {
  commands: Map<string, any>;
  constructor(token: string, options = <ClientOptions>{}) {
    super(token, options);
    this.commands = new Map();
  }
}
