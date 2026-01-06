import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName:{
        type:"String",
        unique:true,
        trim:true,
        lowercase:true,
        required:true,
        minLength:[3,"UserName should be atleast 3 characters long"]
    },
    email:{
        type:"String",
        unique:true,
        trim:true,
        required:true,
        lowercase:true,
        minLength:[10,"Email should be atleast 10 characters long"]
    

    },
    password:{
        type:"String",
        unique:true,
        trim:true,
        required:true,
        minLength:[5,"Password should be atleast 5 characters long"]

    }
}, { timestamps: true });
const userModel = mongoose.model('User', userSchema);
export default userModel;