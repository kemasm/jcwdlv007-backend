const { Sequelize } = require("sequelize");
const dbConfig = require("../configs/db");

const sequelize = new Sequelize({
    username: dbConfig.MYSQL_USER,
    password: dbConfig.MYSQL_PASSWORD,
    database: dbConfig.MYSQL_DB_NAME,
    port: dbConfig.MYSQL_PORT,
    dialect: "mysql",
  });
  

//models
const Actor = require("../models/actor")(sequelize);
const Genre = require("../models/genre")(sequelize);
const Movie = require("../models/movie")(sequelize);
const Studio = require("../models/studio")(sequelize);
const Movie_Actor = require("../models/movie_actor")(sequelize);
const Movie_Genre = require("../models/movie_genre")(sequelize);

// one to many, one to one , many to many, super many to many

//Movie
//1 : m
Movie.belongsTo(Studio, { foreignKey: "studioId"})
Studio.hasMany(Movie, { foreignKey: "studioId"})

//Movie Genre 
// m : m 
// Movie.hasMany(Movie_Genre, { foreignKey: "MovieId" });
// Movie_Genre.belongsTo(Movie, { foreignKey: "MovieId" });
// Genre.hasMany(Movie_Genre, { foreignKey: "GenreId" });
// Movie_Genre.belongsTo(Genre, { foreignKey: "GenreId" });
Movie.belongsToMany(Genre , { through: Movie_Genre ,foreignKey: "MovieId",unique: false })
Genre.belongsToMany(Movie , { through: Movie_Genre ,foreignKey: "Genre", unique: false })


//Movie Actor 
// m : m 
// Movie.hasMany(Movie_Actor, { foreignKey: "MovieId" });
// Movie_Actor.belongsTo(Movie, { foreignKey: "MovieId" });
// Actor.hasMany(Movie_Actor, { foreignKey: "ActorId" });
// Movie_Actor.belongsTo(Actor, { foreignKey: "ActorId" });
Movie.belongsToMany(Actor , { through: Movie_Actor ,foreignKey: "MovieId", unique: false })
Actor.belongsToMany(Movie , { through: Movie_Actor ,foreignKey: "ActorId", unique: false })



module.exports = {
    sequelize,
  Actor,
  Genre,
  Movie,
  Studio,
  Movie_Actor,
  Movie_Genre
  };


