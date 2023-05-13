const { SlashCommandBuilder } = require('discord.js');
const { add_movie } = require('../db.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addmovie')
		.setDescription('Adds a movie title to the list of movies')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The title to the movie to add')
                .setRequired(true)),
	async execute(interaction) {
        const movieTitle = interaction.options.getString('title');
        await add_movie(movieTitle);
		await interaction.reply(`🎉 Added \`${movieTitle}\` to the list of movies.`);
	},
};