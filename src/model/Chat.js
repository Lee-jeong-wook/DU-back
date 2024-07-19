import mongoose from "mongoose";
import dotenv from 'dotenv';
import { ObjectId } from "mongodb";
import ChatSchema from "../MongooseModel/ChatModel.js"
import ChatRoomSchema from "../MongooseModel/ChatRoomModel.js"

dotenv.config();

const ChatModel = mongoose.model('Chat', ChatSchema);
const ChatRoomModel = mongoose.model('ChatRoom', ChatRoomSchema);

class Chat {
    constructor(body) {    
        this.body = body;
    }
    // async getAllMessage (id){
    //     try {
    //         const chatList = await ChatModel.find({room_id:id});
    //         return chatList;
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }
    async getChatRoom (id){
        try {
            return await ChatRoomModel.findOne(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async sendMessage (data){
        try {
            const message = new ChatModel({
                user_id: data.user_id,
                content: data.content,
                date: data.date,
            })
            return await message.save();
        } catch (error) {
            
        }
    }
    async createChatRoom (data){
        try {
    
        } catch (error) {
    
        }
    }
    async getChatRoom(id) {
         try {
            
         } catch (error) {
            
         } 
    }
}

export default  Chat;