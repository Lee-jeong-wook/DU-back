const ChatSchema = new mongoose.Schema({
    user_id: String,
    content: String,
    date: Date
});

export default ChatSchema;