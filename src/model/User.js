import mongoose from "mongoose";
import dotenv from 'dotenv';
import { ObjectId } from "mongodb";

dotenv.config();

import userSchema from "../MongooseModel/UserModel.js";

const UserModel = mongoose.model('User', userSchema);

class User {
    constructor(body) {    
        this.body = body;
    }
    static uploadUser = async (data) => {
        const {id, pw, name, location} = data;
        const user = new UserModel({
            user_id: id,
            pw: pw,
            name: name,
            location: location,
        })
        try {
            const result = await user.save();
            console.log(result);
        } catch (error) {
            console.log(error);
            throw Error;
        }
    }

    static async getUserById(id) {
        try {
            const user =  await UserModel.findOne({user_id : id});
            console.log(user);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async certifiyUser(id, pw) {
        try {
            console.log(id);
            const find_id = ObjectId.createFromHexString(id);
            const user =  await UserModel.findById(find_id);
            console.log(user);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async deleteUserById(id) {
        try {
            const result =  await UserModel.deleteMany({user_id : id});
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async likePost (user_id, post){
        try {
            const result = await UserModel.findOneAndUpdate({user_id:user_id,$push:{like_list:post}});
            console.log(result);
            return;
        } catch (error) {
            console.error(error);
            throw Error;
        }
    }
    static async unlikePost (user_id, post){
        try {
            const result = await UserModel.findOneAndUpdate({user_id:user_id,$pop:{like_list:post}});
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw Error;
        }
    }
    static async findLikePost(user_id, post) {
        console.log("post is : " + post);
        try {
            const user = await UserModel.findOne({
                user_id: user_id,
                // like_list: { $elemMatch: post }
            });
            console.log(user);
            return !!user; // Returns true if user is found, otherwise false
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    static async addChatRoom(idList){
        const result = await UserModel.updateMany(
            { _id: { $in: idList } }, // 조건: idList에 포함된 사용자 ID
            { $push: { chat_room: chatRoomId } } // 업데이트: chat_room 배열에 chatRoomId 추가
        );
        return result;
    }
}

export default  User;