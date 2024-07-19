import ChatSchema from "./ChatModel";

const ChatRoomSchema = new mongoose.Schema({
    user: [String],
    chat: [ChatSchema]
});

export default ChatRoomSchema;