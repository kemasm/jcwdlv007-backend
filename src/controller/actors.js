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
}, 
addActor : async (req,res) => {
    const { name, sex, age,bio } = req.body;
    const uploadFileDomain = "http://localhost:2000";
    const filePath = "post_images";
    const { filename } = req.file;

    // const newActor = await Actor.create({
    //     ...req.body
    // })

    //dengan catatan req.body isinya = nama kolom di database/model

    const newActor = await Actor.update({
        name,
        sex,
        age,
        bio,
        img_src:`${uploadFileDomain}/${filePath}/${filename}`,
    })

    return res.send(newActor)
}

}

module.exports = actorsController;



