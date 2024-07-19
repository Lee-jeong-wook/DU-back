import mongoose from "mongoose";
import postSchema from "./PostModel.js";

const userSchema = new mongoose.Schema({
    user_id: String,
    pw: String,
    name: String,
    location: String,
    like_list: [postSchema],
    chat_room: [mongoose.Schema.Types.ObjectId]
});

export default userSchema;