import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";

import ping from "./slash_commands/ping.js"
import askAi from "./slash_commands/askAi.js"

const commands = [
    ping,
    askAi
];

//----- setup

export async function buildCommands(token, client, guildId) {
    const rest_commands = commands.map(command => command.setup());

    const rest = new REST({ version: "10" }).setToken(token);
    await rest.put(
        Routes.applicationGuildCommands(client.user.id, guildId),
        { body: rest_commands }
    );
}

export function handleInteraction(interaction) {
    if (!interaction.isChatInputCommand()) return;

    commands.forEach(command => {
        if (command.name == interaction.commandName)
            command.command(interaction);
    });
}
