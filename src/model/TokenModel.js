// import { TokenExpiredError } from "jsonwebtoken";
// import { UserToken } from "../interfaces/UserToken";
// import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class TokenModel {
    verify(data){
        try {      
            if (!data) {
              return "Token doesn't exist";
            }
            const jwtDecoded = jwt.verify(data, process.env.JWT_SECRET);
            return jwtDecoded;
          }
          
          // 인증 실패 
          catch(error) {
            if (error instanceof jwt.TokenExpiredError) {
              return "Token expired";
            }
            return "";
          }
    }
    access(data){
        const token = jwt.sign({
            id : data.id, 
            isAdmin : data.isAdmin, 
        }, process.env.JWT_SECRET, {
            expiresIn: '1m', //1분
            issuer: '토큰 발급자'
        });
        return token;
    }
    static refresh(data){
        console.log("data : " + data);
        const token = jwt.sign({
            id : data.user_id, 
            location : data.location
        }, process.env.JWT_SECRET, {
            expiresIn: '8h',
            issuer: '토큰 발급자'
        });
        return token;
    }
}

export default TokenModel;