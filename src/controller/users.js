const { db, dbQuery } = require("../database/");

const userController = {
getLogin: async  (req,res) => {
    let user_email = req.query.user_email;
    let password = req.query.password;
    let sqlQuery = "SELECT * FROM Users where (username ='"+ user_email +"' or email = '"+ user_email +"' ) and password = '" + password +"'" ;
    const resDb = await dbQuery(sqlQuery);
    res.send(resDb);

}}

module.exports = userController;