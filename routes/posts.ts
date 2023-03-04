import express from 'express';
const postsRouter = require("express").Router();
const Post = require("../models/Post");

//ツイート？　ノート？　ポスト？
postsRouter.post("/", async (req :express.Request, res :express.Response) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch(err) {
        return res.status(500).json(err);
    }
});

//更新
postsRouter.put("/:id", async (req :express.Request,res :express.Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿編集に成功しました。");
        } else {
            return res.status(403).json("あなたはほかの人の投稿を編集できません。");
        }
    } catch(err) {
        return res.status(403).json(err);
    }
});

module.exports = postsRouter;