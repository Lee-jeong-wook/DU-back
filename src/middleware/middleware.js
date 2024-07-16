// import { Request, Response, NextFunction } from "express";
// import { UserToken } from "../interfaces/UserToken";
// import dotenv from 'dotenv';
// import { TokenExpiredError } from "jsonwebtoken";
// const TokenModel = require("../model/TokenModel");
import TokenModel from "../model/TokenModel.js";
// dotenv.config();

// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  // 인증 완료
  try {
    const userToken = req.headers.authorization;
    const tokenModel = new TokenModel();
    const response = tokenModel.verify(userToken);
    console.log(response);
    req.user = response;
    return next();
  }
  
  // 인증 실패 
  catch(error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.'
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.'
    });
  }
}

export default verifyToken;