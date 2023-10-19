const Post = require("../models/post");

module.exports = {
  createPost: async (req, res, next) => {
    try {
      // req.body.password = await Users.encrypPassword(req.body.password)
      let post = await Post.create(req.body);
      if (!post) {
        res.status(502).send({ msg: "post not created", err: post });
      }
      await post.save();
      res.status(201).send({ msg: "post created", data: post });
    } catch (error) {
      next(error, req, res);
    }
  },
  getPostById: async (req, res) => {
    let id = req.params.id;
    let post = await Post.findOne({ _id: id });
    res.status(200).send({ msg: "sucess", data: post });
  },
  updatePost: async (req, res) => {
    let id= req.params.id;
    let newData = req.body;
    let updatedPost = await Post.findByIdAndUpdate({ _id: id }, newData, {new: true});
    res.status(201).send({ msg: "updated post succes", data: updatedPost});
  },
  deletePost: async (req, res) => {
    let id= req.params.id;
    let deletedPost = await Post.findByIdAndDelete({_id: id});
    deletedPost
    res.send({msg: "deleted post"} )
  }
};
