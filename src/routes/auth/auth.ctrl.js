// import {verifyToken} from '../../middleware/middleware';
const middleware = require('../../middleware/middleware');
const jwt = require('jsonwebtoken');
// import TokenModel from "../../model/TokenModel";
// dotenv.config();

const post = {
    makeToken: async (req, res) => {
        try {
            const data = req.body;
            const tokenModle = new TokenModel();
            // jwt.sign() 메소드: 토큰 발급 
            const token = tokenModle.refresh(data);
            return res.json({
                code: 200,
                message: '토큰이 발급되었습니다.',
                token,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                code: 500,
                message: '서버 에러',
            });  
        }
    },

}

module.exports= {
    post
};