const { db, dbQuery } = require("../database/");
const qs = require("qs");
const { parse } = require("qs");
const { User } = require("../lib/sequelize");
const { generateToken, verifyToken } = require("../lib/jwt");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");


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
},
registerV2: async (req, res) => {
    try {
      const { username, password, full_name, email } = req.body;

      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      // if (findUser) {
      //   throw Error("username/email has been taken");
      // }

      console.log(findUser);

      const hashedPassword = bcrypt.hashSync(password, 5);

      const user = await User.create({
        username,
        password: hashedPassword,
        full_name,
        email,
      });

      const token = await generateToken({ id: user.id, isEmailVerification : true });

    //   const verToken = await  (user.id, email, username)

      // console.log(verToken)

      return res.status(200).json({
        message: "new user has been created",
        result: { user, token },
      });
    } catch (err) {
      console.log("error");
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
  loginV2: async (req, res) => {
    try {
      const { email, password, username } = req.query;

      const user = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (!user) {
        throw new Error("username/email/password not found");
      }

      const checkPass = await bcrypt.compareSync(password, user.password);
      console.log(checkPass);
      if (!checkPass) {
        throw new Error("password salah");
      }
      const token = generateToken({ id: user.id });

      delete user.dataValues.password;
      delete user.dataValues.createdAt;
      delete user.dataValues.updatedAt;

      console.log(user);

      res.status(200).json({
        message: "login succeed",
        result: { user, token },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  keepLogin: async (req, res) => {
    // Terima token
    // Check kalau token valid
    // Renew token
    // Kirim token + user data
    try {
      const { token } = req;

      const renewedToken = generateToken({ id: token.id, password: token.password });

      const findUser = await User.findByPk(token.id);

      delete findUser.dataValues.password;

      return res.status(200).json({
        message: "Renewed user token",
        result: {
          user: findUser,
          token: renewedToken,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },

}

module.exports = userController;