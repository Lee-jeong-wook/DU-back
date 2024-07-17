// const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase-admin/firestore-storage");
// const { getFirestore, collection, addDoc } = require("firebase/firestore");
import storage from "../config.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    like: Number,
    category: String,
    content: String,
    image: String,
    cost: Number,
    location: String
});

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
        const {title, author, like, content, location, category, cost} = data;
        const post = new PostModel({
            title: title,
            author: author,
            like: like,
            category: category,
            cost:cost,
            content: content,
            image: image,
            location: location
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
        const post = PostModel.findById({id:id});
        return post;
    }
    

}

export default Market;