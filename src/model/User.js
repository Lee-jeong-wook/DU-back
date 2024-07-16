const mongoose = require("mongoose");
require('dotenv').config();

const userSchema = new mongoose.Schema({
    user_id: String,
    pw: String,
    name: String,
    location: String,
});

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
            // const user = await UserModel.findById(id);
            // const user = await UserModel.findOne({"useer_id":id});
            // const user = await UserModel.
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
            // const user = await UserModel.findById(id);
            // const user = await UserModel.findOne({"useer_id":id});
            // const user = await UserModel.
            const user =  await UserModel.findOne({user_id : id, pw : pw});
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async deleteUserById(id) {
        try {
            const result =  await UserModel.deleteMany({user_id : id});
            return [result];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports =  User;