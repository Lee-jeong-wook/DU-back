import mongoose from "mongoose";
import userSchema from "./UserModel.js";

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    like: Number,
    category: String,
    content: String,
    image: String,
    cost: Number,
    location: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default  postSchema ;