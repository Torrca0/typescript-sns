import express from 'express';
const authRouter = require("express").Router();
const User = require("../models/User");

//ユーザー作成をしますよ
authRouter.post("/register", async (req :express.Request, res :express.Response) => {
    try {
        const newUser = await new User({
            "username": req.body.username,
            "email": req.body.email,
            "password":req.body.password
        });

        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//ログインをしますよ
authRouter.post("/login", async (req :express.Request, res :express.Response) => {
    try {
        const user = await User.findOne({ email: req.body.email});
        if(!user) return res.status(404).send("ユーザーが見つかりません");

        const valuedPassword = req.body.password === user.password;
        if(!valuedPassword) return res.status(200).json("パスワードが違います");

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = authRouter;