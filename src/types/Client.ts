import { Client } from "eris";
import { Command } from "./Command";
import { Event } from "./Event";

export class BotClient extends Client {
    commands: Map<string, Command> = new Map();
    events: Map<string, Event> = new Map();
}