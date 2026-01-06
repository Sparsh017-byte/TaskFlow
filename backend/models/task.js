import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        default: "pending"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }
}, { timestamps: true });
const taskModel = mongoose.model('Task', taskSchema);
export default taskModel;