const express = require('express');
const router = express.Router();
const middleware = require('../../middleware/middleware');

//컨트롤러에서 post, get 방식으로 처리할 데이터들 불러옴
const ctrl = require('./auth.ctrl');
const verifyToken = require('../../middleware/middleware');

const authRouter = express.Router();

//get은 ctrl 뒤에 output, post는 post를 붙임
authRouter.post('/make', ctrl.post.makeToken);
// authRouter.post('/check', verifyToken,ctrl.post.checkToken);

module.exports= authRouter;