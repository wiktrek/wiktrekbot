import { Event } from "../types/Event";
import { BotClient } from "../types/Client";
import { loadCommands } from "../handlers/commandHandler";
import { AsciiTable3 } from "ascii-table3";

const ready: Event = {
    name: "ready",
    once: true,
    async execute(client: BotClient) {
        console.log(`Bot is ready! Logged in as ${client.user?.username}`);
        await loadCommands(client);

        const guildID = process.env.GUILD_ID!;
        let registeredNames = new Set<string>();
        try {
            const regs = await client.getGuildCommands(guildID);
            registeredNames = new Set(regs.map(r => r.name));
        } catch (err) {
            console.error("Failed to fetch registered guild commands:", err);
        }

        const commandsTable = new AsciiTable3("Commands");
        commandsTable.setHeading("Command", "Status");
        for (const [name] of client.commands) {
            const ok = registeredNames.has(name);
            commandsTable.addRow(name, ok ? "☑" : "X");
        }
        console.log(commandsTable.toString());

        const eventsTable = new AsciiTable3("Events");
        eventsTable.setHeading("Event", "Once");
        for (const [name, event] of client.events) {
            eventsTable.addRow(name, event.once ? "☑" : "X");
        }
        if (client.events.size === 0) {
            eventsTable.addRow("-", "No events");
        }
        console.log(eventsTable.toString());

        // console.log(`${client.commands}, ${client.events}`);
    },
};

export default ready;