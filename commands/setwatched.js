const { SlashCommandBuilder } = require('discord.js');
const { set_watched, list_all } = require('../db.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setwatched')
		.setDescription('Sets a watched movie true.')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The title to the movie to set as watched')
                .setRequired(true)),
	async execute(interaction) {
        const movieTitle = interaction.options.getString('title');
        // verify that the movie exists
        const movies = await list_all();
        let movieExists = false;
        let movieId = '';
        if (movies.items.length != 0){
            const foundMovie = movies.items.find(movie => movie.title === movieTitle);
            if (foundMovie) {
                movieExists = true;
                movieId = foundMovie.id;
            }
        }
        if (!movieExists){
            await interaction.reply(`🦗 \`${movieTitle}\` is not in the list of movies.`);
            return;
        }
        // grab the movie's id
        // set the movie as watched
        await set_watched(movieId);
        await interaction.reply(`🎉 Set \`${movieTitle}\` as watched.`);
	},
};