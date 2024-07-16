// const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase-admin/firestore-storage");
// const { getFirestore, collection, addDoc } = require("firebase/firestore");
import storage from "../config.js";
// const { storage }= require("firebase-admin");
// const firebase = require('firebase/storage');
// const storageRef = firebase.ref();

class Market {  
    constructor(body) {    
        this.body = body;
    }
    static uploadImg = async(file) => {
        try {
            const fileName = `${Date.now()}-${file.originalname}`;
            const storageRef = storage.ref(`images/${fileName}`);
            
            storageRef.put(file)
              .then((snapshot) => {
                console.log('File uploaded successfully!');
                return snapshot.ref.getDownloadURL();
              })
              .then((downloadURL) => {
                console.log('File available at', downloadURL);
                res.status(200).json({ downloadURL });
              })
              .catch((error) => {
                console.error('Error uploading file:', error);
                res.status(500).send('Error uploading file');
              });
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