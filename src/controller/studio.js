const { db, dbQuery } = require("../database/");
const qs = require("qs");
const { parse } = require("qs");
const { Studio} = require("../lib/sequelize");
const { Op } = require("sequelize");
const studiosController = {
getAll : async (req,res) => {

    const studio = await Studio.findAll();

    return res.send(studio)
}

}

module.exports = studiosController;



