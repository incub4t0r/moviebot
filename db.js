const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('http://127.0.0.1:8090')

async function list_all(){
    const all_movies = await pb.collection('movies').getList(1, 100, {
        filter: 'title != ""',
        sort: 'created,title',
    });
    // console.log(all_movies);
    return all_movies
}

async function add_movie(movie_title){
    const movie = await pb.collection('movies').create({
        title: movie_title,
    });
    // console.log(movie);
    return movie
}

async function set_watched(movie_id){
    // console.log(movie_id);
    const movie = await pb.collection('movies').update(movie_id, {
        watched: true,
    })
    return movie
}

module.exports = { list_all, add_movie, set_watched };