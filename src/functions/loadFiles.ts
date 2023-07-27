import { readdirSync } from 'fs';
interface Event {
  name: string;
  run: any;
}
export function loadCommands() {
  const commandFiles = readdirSync('~/commands').filter((file) =>
    file.endsWith('.ts')
  );
}
export async function loadEvents(): Promise<Event[]> {
  const events: Event[] = [];
  const eventFiles = readdirSync('~/events').filter((file) =>
    file.endsWith('.ts')
  );
  for (let element of eventFiles) {
    const slashCommandObject = await import(`./commands/${element}`);
    events.push({
      name: slashCommandObject.default.data.name,
      run: slashCommandObject.default.run,
    });
  }
  return Promise.resolve(events);
}
