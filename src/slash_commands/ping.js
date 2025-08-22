import { SlashCommandBuilder } from "discord.js";

const name = "ping";

async function ping(interaction) {
    await interaction.reply("pong");
}

function setup() {
    return new SlashCommandBuilder()
        .setName(name)
        .setDescription("Ping test");
}

export default {
    name: name,
    command: ping,
    setup: setup
};
