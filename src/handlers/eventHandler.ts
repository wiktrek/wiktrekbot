import { Client } from 'eris';
import { readdirSync } from "fs";
interface Event {
    default: {
    name: string;
    run: any;
    }
}
export async function eventHandler(client: Client) {
     const eventFiles = readdirSync("./src/events/").filter((f) =>
            f.endsWith(".ts")
        );
        for (const file of eventFiles) {
            const event: Event = await import(`../events/${file}`);
            console.log(event);
            // if there is no event name throw an error
            if (!event.default.name) {
                throw new Error(`${file} needs to have a command.name!`);
            }

            console.log(event.default.name);
            event.default.run(client)
        }
}