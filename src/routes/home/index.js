"use strict"

const express = require('express');
const router = express.Router();
const multer = require('multer');
// const imageRouter = Router();

const storage = multer.memoryStorage()
const upload = multer({storage:storage});

const ctrl = require('./home.ctrl');
const verifyToken = require('../../middleware/middleware');

// ctrl 폴더에서 output이나 process 꺼내기
router.get('/', ctrl.output.home);
router.post('/', verifyToken,ctrl.process.list);

router.post('/user/signup', ctrl.process.singUp);
router.post('/user/login', ctrl.process.login);
router.post('/user/delete', ctrl.process.deleteUser);

router.get('/market/', ctrl.output.market);
router.post('/market/upload',upload.single('image'), ctrl.process.makePost);
router.post('/market/:id', ctrl.process.list);

router.get("/chat/:userid");
router.get("/chat");

module.exports= router;