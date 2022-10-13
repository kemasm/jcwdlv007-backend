const { db, dbQuery } = require("../database/");
const qs = require("qs");
const { parse } = require("qs");
const { Movie,Actor,Studio,Genre, Movie_Actor,Movie_Genre, sequelize} = require("../lib/sequelize");
const { Op } = require("sequelize");
const fs = require('fs')

const moviesController = {
getMovies: async  (req,res) => {
    const movie = req.query.movie;
    let sqlQuery = 
    `select m.id,film_name,duration,img_src,about, year_released,rating,studio_name 
    from movies m 
    join studios s on s.id = m.studioid
    where film_name like "%${movie}%";`
    const resDb = await dbQuery(sqlQuery);
   return res.send(resDb);
},
getGenreByMovieId: async  (req,res) => {
    const id = req.params.id;
    let sqlQuery = `select genre from movies m
    join movie_genres gn on gn.movieid = m.id
    join genres g on g.id = gn.genreid
    where m.id = ${id}; `
    const resDb = await dbQuery(sqlQuery);
   return res.send(resDb);
},
getActorByMovieId: async  (req,res) => {
    const id = req.params.id;
    let sqlQuery = `select a.name from movies m
    join movie_actors ma on ma.movieid = m.id
    join actors a on a.id = ma.actorid
    where m.id = ${id}; `
    const resDb = await dbQuery(sqlQuery);
   return res.send(resDb);
},
getMovies2 : async (req,res) => {
    const movie = req.query.movie;

    const movies = await Movie.findAll({

        include: [{
            model: Genre,
            through: { attributes: [] }
          },
          {
            model: Actor,
            through: { attributes: [] }
          }
            ]
        ,
        where : {
           film_name : {
           [Op.like] : `%${movie}%`
           }
//    select * from movies where film_name like '%movie%'

        }
    })

    return res.send(movies)
},
addMovie : async (req,res) => {
    const { film_name, duration, year_released,rating, about,studioId} = req.body;
    const uploadFileDomain = "http://localhost:2000";
    const filePath = "movie_images";
    const { filename } = req.file;

    const newActor = await Movie.create({
          film_name,
          duration,
          year_released,
          rating,
          img_src : `${uploadFileDomain}/${filePath}/${filename}`,
          about,
          studioId
    })

    return res.send(newActor)
},
deleteMovie : async (req,res) => {
    const {id, old_img } = req.body
    console.log(req.body)

    await Movie.destroy({
        where: {
            id
        }
    })

    console.log(old_img)

    const path =`${__dirname}/../public/movie_images/${old_img}`
    console.log(path)

//file system
// library yang dapat mengakses directory/file yg ada di sistem/server
fs.unlink(path, (err) => {
  if (err) {
    console.error(err)
    return
  }

  //file removed
})
    return res.send("movie deleted")
},
editMovie: async (req,res) => {
    const { film_name, duration, year_released,rating, about,studioId,old_img,id} = req.body;
    const uploadFileDomain = "http://localhost:2000";
    const filePath = "movie_images";

    let editData = {};

    if(req.file?.filename)
    {
        // ada perubahan gambar
        const { filename } = req.file;

        const path =`${__dirname}/../public/movie_images/${old_img}`
        fs.unlink(path, (err) => {
            if (err) {
              console.error(err)
              return
            }
          
            //file removed
          })
        

        editData = {
            film_name,
            duration,
            year_released,
            rating,
            img_src : `${uploadFileDomain}/${filePath}/${filename}`,
            about,
            studioId
      }
      
    }
    else
    {
        editData = {
            film_name,
            duration,
            year_released,
            rating,
            about,
            studioId
      }
        
    }
         await Movie.update(
       { ...editData }, {
            where: {id}
            }
         )

    return res.send("movie edited");
}

}

module.exports = moviesController;



