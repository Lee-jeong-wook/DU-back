"use strict";

import mongoose from 'mongoose';
import User from '../../model/User.js';
import TokenModel from '../../model/TokenModel.js';
import Market from '../../model/Market.js';

const postSchema = new mongoose.Schema({
    image: String,
    title: String,
    content: String,
    author: String,
    price: Number,
});

const Post = mongoose.model('Post', postSchema);

const output = {
    home: (req, res) => {
        // res.render('home/index')
    },
    market: (req, res) => {
        console.log(req);
        console.log(req.file.buffer);
        res.status(200).json({ 'msg': 'success' });
    },
    userChatList: (req, res) => {

    },
    userChat: (req, res) => {

    }
};

// post방식으로 보낼 코드
const process = {
    list: (req, res) => {
        const data = req.body;
        console.log(req.user);
        return res.json({ data: data });
    },
    analyze: (req, res) => {
        const data = req.body;
    },
    makePost: async (req, res) => {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        Market.uploadImg(file);
        console.log(req.file.originalname);
        console.log(req.file);
        // await image.save();
        res.send("success");
    },
    singUp: async (req, res) => {
        try {
            console.log("req : " + req.body);
            if (await User.getUserById(req.body.id)) {
                return res.status(400).send("already exist id");
            }
            await User.uploadUser(req.body);
            res.send("User signed up successfully");
        } catch (error) {
            res.status(500).send(error.message + "500");
        }
    },
    login: async (req, res) => {
        try {
            const { id, pw } = req.body;
            console.log(req.body);
            const user = await User.certifiyUser(id, pw);
            if (!user) {
                return res.status(400).send("cannot find user");
            }
            console.log(user);
            const token = TokenModel.refresh(user);
            console.log(token);
            res.status(200)
                .cookie('token', token, { httpOnly: false }) // JWT 토큰을 쿠키에 설정
                .cookie('id', user.user_id, { httpOnly: false }) // 사용자 ID를 쿠키에 설정
                .cookie('location', user.location, { httpOnly: false })
                .json({ message: 'Login successful' });
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const result = await User.deleteUserById(req.body.id);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    },
};

export default {
    output,
    process
};