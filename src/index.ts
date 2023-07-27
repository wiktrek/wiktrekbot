import Eris from 'eris';
import { config } from 'dotenv';
import eventHandler from './handlers/eventHandler';
config();

export const client = new Eris.Client(process.env.TOKEN as string, {
  intents: [],
});
eventHandler();
client.connect();
