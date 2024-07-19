"use strict";
import User from '../../model/User.js';
import TokenModel from '../../model/TokenModel.js';
// import Market from '../../model/Market.js';
import Market from "../../model/Market.js"
// const GoogleVision = require('../../model/Google.js');
import GoogleVision from "../../model/Google.js";
// import vision from '@google-cloud/vision';
import { promises as fs } from 'fs';

const googleVision = new GoogleVision();

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

    },
    getOne: async (req, res) => {
        const id = req.params.id; 
        const result = await Market.getPost(id);
        return res.json({result: result});
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
        console.log(result);
        res.status(200);
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
    likePost: async (req, res) => {
        try {
            const {user_id, post_id} = req.body;
            const post = await Market.getPost(post_id);
            if(await User.findLikePost(user_id, post)){
                console.log("unlike");
                const result = await User.unlikePost(user_id,post);
                console.log(result);
                await Market.unlikePost(post);
            } else{
                console.log("like");
                const result = await User.likePost(user_id,post);
                await Market.likePost(post);
            }
            return res.status(200).json({"msg":"success"});
        } catch (error) {
            console.error(error);
            res.send(error.message);
        }
    },
    deletePost: async(req, res) => {
        const {post_id} = req.body;
        const list = await Market.deletePost(post_id);
        console.log(list);
    },
    handleProductSearch : async (req, res) => {
        try {
        const file = req.file;
        console.log("file is = " + file);
          const results = await googleVision.searchSimilarProducts("us-west1", "apparel", file.buffer, "");
          await fs.unlink(file.buffer); // Clean up the uploaded file
          console.log(results);
          res.json(results);
        } catch (error) {
            console.log("error");
          console.error(error);
        //   res.redirect("./index.html");
          return res.json({img:"https://zerowastechef.com/wp-content/uploads/2024/02/02.24.24-denim-jeans-bag-front.jpg"});
        }
      },
      listProducts :async (req, res) =>{
      
        try {
          const products = await googleVision.listProducts("us-west1");
          res.json(products);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
    }
};

export default {
    output,
    process
};