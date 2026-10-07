const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
    });
    res.status(201).json({
      message: "Post Created",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Create Post",
      error: error.message,
    });
  }
};
// Get All Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get Posts",
      error: error.message,
    });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({
      _id: id,
      user: req.user.id,
    });
    if (!post) {
      return res.status(404).json({
        message: "Unable to find Post",
      });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrive single post",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      },
    );
    if (!post) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Unable to Update Post",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!post) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }
    res.json({
      message: "Post Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete",
      error: error.message,
    });
  }
};
