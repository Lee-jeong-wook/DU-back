"use strict";

import express from 'express';
import multer from 'multer';
import ctrl from './home.ctrl.js';
import verifyToken from '../../middleware/middleware.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ctrl 폴더에서 output이나 process 꺼내기
router.get('/', ctrl.output.home);
router.post('/', verifyToken, ctrl.process.list);

router.post('/user/signup', ctrl.process.singUp);
router.post('/user/login', ctrl.process.login);
router.post('/user/delete', ctrl.process.deleteUser);

router.get('/market/', ctrl.output.market);
router.post('/market/upload', upload.single('image'), ctrl.process.makePost);
router.post('/market/:id', ctrl.process.list);

router.get("/chat/:userid");
router.get("/chat");

export default router;