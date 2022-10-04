const { db, dbQuery } = require("../database/");
const qs = require("qs");
const { parse } = require("qs");

const moviesController = {
getMovies: async  (req,res) => {
    const movie = req.query.movie;
    let sqlQuery = 
    `select m.id,film_name,duration,img_src,about, year_released,rating,studio_name 
    from movies m 
    join studio s on s.id = m.studioid
    where film_name like "%${movie}%";`
    const resDb = await dbQuery(sqlQuery);
   return res.send(resDb);
},
getGenreByMovieId: async  (req,res) => {
    const id = req.params.id;
    let sqlQuery = `select genre from movies m
    join movie_genre gn on gn.movieid = m.id
    join genre g on g.id = gn.genreid
    where m.id = ${id}; `
    const resDb = await dbQuery(sqlQuery);
   return res.send(resDb);
},
getActorByMovieId: async  (req,res) => {
    const id = req.params.id;
    let sqlQuery = `select a.name from movies m
    join movie_actor ma on ma.movieid = m.id
    join actor a on a.id = ma.actorid
    where m.id = ${id}; `
    const resDb = await dbQuery(sqlQuery);
   return res.send(resDb);
},
}

module.exports = moviesController;