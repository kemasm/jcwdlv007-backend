const { db, dbQuery } = require("../database/");
const qs = require("qs");
const { parse } = require("qs");

const userController = {
getLogin: async  (req,res) => {
    let user_email = req.query.user_email;
    let password = req.query.password;
    let sqlQuery = "SELECT * FROM Users where (username ='"+ user_email +"' or email = '"+ user_email +"' ) and password = '" + password +"'" ;
    const resDb = await dbQuery(sqlQuery);
   return res.send(resDb);
},
register: async (req,res) => {
    const data = await (req.body)
    console.log(qs.parse(data))
    console.log(data);
    let sqlQuery = `insert into users (email,password,name,username,bio,role,avatar_url) 
    values ( '${data.email}', '${data.password}', '${data.name}', '${data.username}', '${data.bio}' , '${data.role}' , '${data.avatar_url}' )` 
    const resDB = await dbQuery(sqlQuery)
   return res.send(resDB)
}
}

module.exports = userController;