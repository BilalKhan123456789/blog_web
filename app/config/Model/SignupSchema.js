import mongoose from "mongoose";


const SignupSchema = mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
    cpassword:String
})

if(mongoose.models["signupusers"]){

delete mongoose.models["signupusers"]

}




export const product = mongoose.model("signupusers",SignupSchema)