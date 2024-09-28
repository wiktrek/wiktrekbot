import { Client } from "eris";
import { readdirSync } from "fs";
interface Event {
  default: {
    name: string;
    run: any;
  };
}
export async function eventHandler(client: Client) {
  const eventFiles = readdirSync("./src/events/").filter((f) =>
    f.endsWith(".ts"),
  );
  for (const file of eventFiles) {
    const event: Event = await import(`../events/${file}`);
    if (!event.default.name) {
      throw new Error(`${file}`);
    }

    event.default.run(client);
  }
}
