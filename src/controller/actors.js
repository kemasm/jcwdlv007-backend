const { db, dbQuery } = require("../database/");
const qs = require("qs");
const { parse } = require("qs");
const { Actor, sequelize, Movie} = require("../lib/sequelize");
const { Op } = require("sequelize");
const actorsController = {
getActors : async (req,res) => {

    const actors = await Actor.findAll( {
        include : [{
            model : Movie, 
            through: { attributes: [] }
        }
        ]
    });

    return res.send(actors)
}

}

module.exports = actorsController;



