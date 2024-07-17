"use strict";
import User from '../../model/User.js';
import TokenModel from '../../model/TokenModel.js';
import Market from '../../model/Market.js';

const output = {
    list: async (req, res) => {
        const list = await Market.getList();
        return res.status(200).json({"msg":"success", "list":list});
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
    analyze: (req, res) => {
        const data = req.body;
    },
    makePost: async (req, res) => {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const url = await Market.uploadImg(req.file);
        const result = await Market.makePost(req.body, url);
        res.status(200).json({"msg": "success"});
    },
    singUp: async (req, res) => {
        try {
            console.log("req : " + req.body);
            if (await User.getUserById(req.body.id)) {
                return res.status(400).send("already exist id");
            }
            await User.uploadUser(req.body);
            res.status(200).json({"msg": "success"});
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