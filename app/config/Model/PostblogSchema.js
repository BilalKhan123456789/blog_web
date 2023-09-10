import mongoose from "mongoose";


const Post_Blogs = mongoose.Schema({
    title:String,
    message:String,
    imageLink:String,
    name:String,
    uid:String
})

if(mongoose.models["Post_Bloging"]){

delete mongoose.models["Post_Bloging"]

}




export const showBlogs = mongoose.model("Post_Bloging",Post_Blogs)