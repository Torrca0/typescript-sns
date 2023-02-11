import express from 'express';
const usersUser = require("../models/User");
const usersRouter = require("express").Router();


//ユーザー情報更新
usersRouter.put("/:id", async(req :express.Request, res :express.Response) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await usersUser.findByIdAndUpdate(req.params.id , {
                $set  :req.body,
            });
            res.status(200).json("ユーザー情報が更新されました");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("あなたは自分のアカウントの時だけ情報を更新することができます。");
    }
});

//ユーザー情報削除
usersRouter.delete("/:id", async(req :express.Request, res :express.Response) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await usersUser.findByIdAndDelete(req.params.id);
            res.status(200).json("ユーザー情報が削除されました");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("あなたは自分のアカウントの時だけ情報を削除することができます。");
    }
});

//ユーザー情報取得
usersRouter.get("/:id", async(req :express.Request, res :express.Response) => {
        try {
            const user = await usersUser.findById(req.params.id);
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
);

//ユーザーのフォロー
usersRouter.put("/:id/follow" , async (req :express.Request, res :express.Response) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await usersUser.findById(req.params.id);
            const currentUser = await usersUser.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push : {
                        followers: req.body.userId,
                    }
                });

                await currentUser.updateOne({
                    $push : {
                        followings: req.params.id,
                    }
                });

                return res.status(200).json("フォローに成功しました。");
            } else {
                return res.status(403).json("あなたはすでにこのユーザーをフォローしています。");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("自分自身をフォローできません。");
    }
});

//ふぉろ解除
usersRouter.put("/:id/unfollow" , async (req :express.Request, res :express.Response) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await usersUser.findById(req.params.id);
            const currentUser = await usersUser.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $pull : {
                        followers: req.body.userId,
                    }
                });

                await currentUser.updateOne({
                    $pull : {
                        followings: req.params.id,
                    }
                });

                return res.status(200).json("フォロー解除に成功しました。");
            } else {
                return res.status(403).json("このユーザーはフォロー解除できません。");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("自分自身をフォロー解除できません。");
    }
});


module.exports = usersRouter;