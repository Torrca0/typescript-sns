import express from 'express';
const postsRouter = require("express").Router();

postsRouter.get("/", (req :express.Request, res :express.Response) => {
    res.send("posts router");
});

module.exports = postsRouter;