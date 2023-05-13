const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setwatched')
		.setDescription('Sets a watched movie true.'),
	async execute(interaction) {
		await interaction.reply('TEST: Notional list of movies');
	},
};