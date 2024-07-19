"use strict";

import express from 'express';
import multer from 'multer';
import ctrl from './home.ctrl.js';
import verifyToken from '../../middleware/middleware.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ctrl 폴더에서 output이나 process 꺼내기
router.get('/', ctrl.output.list);
// router.post('/', verifyToken, ctrl.process.list);

router.post('/user/signup', ctrl.process.singUp);
router.post('/user/login', ctrl.process.login);
router.post('/user/delete', ctrl.process.deleteUser);

router.get('/market/', ctrl.output.market);
router.post('/market/upload', upload.single('image'), ctrl.process.makePost);
router.post('/market/like',  ctrl.process.likePost);
router.post('/market/delete',  ctrl.process.deletePost);
router.get('/market/:id', ctrl.output.getOne);
// router.post('/market/:id', ctrl.process.list);

router.post('/analyze',  upload.single('image'),ctrl.process.handleProductSearch);
router.post('/analyze/list', ctrl.process.listProducts);

router.get("/chat/:userid");
router.get("/chat");

export default router;