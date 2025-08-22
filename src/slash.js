import { REST } from "@discordjs/rest";
import { Routes, SlashCommandBuilder } from "discord.js";

//----- slash commands

async function ping(interaction) {
    await interaction.reply("pong");
}

const commands = {
    "ping": ping
};
const descriptions = {
    "ping": "ping pong thing"
};


//----- setup

export async function buildCommands(token, client, guildId) {
    const rest_commands = Object.keys(commands).map(name =>
        new SlashCommandBuilder()
        .setName(name)
        .setDescription(descriptions[name] || "")
    );

    const rest = new REST({ version: "10" }).setToken(token);
    await rest.put(
        Routes.applicationGuildCommands(client.user.id, guildId),
        { body: rest_commands }
    );
}

export async function handleInteraction(interaction) {
    if (!interaction.isChatInputCommand()) return;

    await commands[interaction.commandName](interaction);
}
