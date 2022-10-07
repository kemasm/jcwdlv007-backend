const { db, dbQuery } = require("../database/");
const qs = require("qs");
const { parse } = require("qs");
const { Genre, sequelize, Movie} = require("../lib/sequelize");
const { Op } = require("sequelize");
const genresController = {
getGenres : async (req,res) => {

    const genres = await Genre.findAll();

    return res.send(genres)
}

}

module.exports = genresController;



