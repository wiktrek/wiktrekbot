import 'dotenv/config';
import { eventHandler } from './handlers/eventHandler';
import { commandHandler } from './handlers/commandHandler';
import { Client } from './Client';
import 'dotenv/config';
const mongoose = require('mongoose');
export const client = new Client(process.env.TOKEN as string, {
  intents: ['all'],
});
commandHandler(client);
eventHandler(client);
client.connect();
mongoose
  .connect(process.env.DB as string)
  .then(() => console.log('Connected to mongoDB!'));
