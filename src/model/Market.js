// const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase-admin/firestore-storage");
// const { getFirestore, collection, addDoc } = require("firebase/firestore");
import storage from "../config.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import mongoose from "mongoose";

import postSchema from "../MongooseModel/PostModel.js";
import { ObjectId } from "mongodb";

const PostModel = mongoose.model('Post', postSchema);

class Market {  
    constructor(body) {    
        this.body = body;
    }
    static uploadImg = async(file) => {
        try {
            
            const locationRef = ref(
                storage,
                `${Date.now()}-${file.originalname}`
            )
            const result = await uploadBytes(locationRef, file.buffer, {contentType: file.mimetype});
            const imgurl = await getDownloadURL(result.ref);
            console.log(typeof(imgurl));
            return imgurl;
          } catch (error) {
            console.error("Error uploading file: ", error);
          }
    }
    static makePost = async(data, image) => {
        const {title,  like, content, location, category, cost, id} = data;
        console.log("hi");
        console.log(id);
        const post = new PostModel({
            title: title,
            author: "user",
            like: like,
            category: category,
            cost:cost,
            content: content,
            image: image,
            location: location,
            user: ObjectId.createFromHexString(id)
        })
        try {
            const result = await post.save();
            return result;
        } catch (error) {
            console.log(error);
            throw Error;
        }
    }
    static getList = async() => {
        const list =await PostModel.find({});
        console.log(list);
        return list;
    }
    static getListByCategory = async(category) => {
        const list = PostModel.find({category: category});
        return category;
    }
    static getPost = async(id) => {
        const post_id = ObjectId.createFromHexString(id);
        console.log(ObjectId.isValid(post_id));
        const post = await PostModel.findById(post_id);
        return post;
    }
    static likePost = async(id) => {
        console.log(id);
        const result = await PostModel.findByIdAndUpdate(id,{$inc:{like: 1}});
        console.log(result);
        return result;
    }
    static unlikePost = async(id) => {
        console.log(id);
        const result = await PostModel.findByIdAndUpdate(id,{$inc:{like: -1}});
        console.log(result);
        return result;
    }
    static deletePost = async(id) => {
        return await PostModel.deleteMany({id:id});
    }
    

}

export default Market;