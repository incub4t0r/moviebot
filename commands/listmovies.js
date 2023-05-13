const { SlashCommandBuilder } = require('discord.js');

// import list_all from db.js
const { list_all } = require('../db.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listmovies')
		.setDescription('Lists all movies that need to be watched.'),
	async execute(interaction) {
        const movies = await list_all();
        let movieList = '';
        // filter out watched movies
        if (movies.items.length != 0){
            movies.items.forEach(movie => {
                if (!movie.watched){
                    movieList += `🎥 ${movie.title}\n`;
                }
            });
            if (movieList.length == 0) {
                movieList = '🦗 No movies to watch!';
            }
        }
        else {
            movieList = '🦗 No movies to watch!';
        }
        await interaction.reply(movieList);
	},
};