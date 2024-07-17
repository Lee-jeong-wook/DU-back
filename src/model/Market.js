// const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase-admin/firestore-storage");
// const { getFirestore, collection, addDoc } = require("firebase/firestore");
import storage from "../config.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// const { storage }= require("firebase-admin");
// const firebase = require('firebase/storage');
// const storageRef = firebase.ref();

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
            console.log(imgurl);
            return imgurl;
          } catch (error) {
            console.error("Error uploading file: ", error);
          }
    }
    makePost = async(data) => {

    }
    getList = async() => {

    }
    getPost = async() => {

    }
    

}

export default Market;