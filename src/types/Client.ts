import Eris from "eris";
import { Command } from "./Command";
import { Event } from "./Event";

export class BotClient extends Eris.Client {
    commands: Map<string, Command> = new Map();
    events: Map<string, Event> = new Map();
}