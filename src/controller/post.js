const { Post, User, Like, Comment } = require("../lib/sequelize");


const postController = {
  getAllPost: async (req, res) => {
    try {
      const { limit, page } = req.query;
      const findPost = await Post.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        include: [User, Like, Comment],
      }
      
     
       
      
      );
      return res.status(200).json({
        message: "fetched data post",
        results: findPost,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  }
};

module.exports = postController;
