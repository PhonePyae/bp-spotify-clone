import mongoose from "mongoose";

const messsageSchema = new mongoose.Schema({
    senderId:{
        type: String,
        required: true,
    }, // Clerk ID of the sender
    receiverId:{
        type: String,
        required: true,
    }, // Clerk ID of the receiver
    content:{
        type: String,
        required: true,
    }, // Message content
}, { 
    timestamps: true,
});
export const Message = mongoose.model("Message", messsageSchema);