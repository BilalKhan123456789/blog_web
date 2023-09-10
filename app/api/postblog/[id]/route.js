import mongoose from "mongoose"
import { NextResponse } from "next/server"

import {connect_db} from "../../../config/db"
import {showBlogs} from "../../../config/Model/PostblogSchema"



export async function GET(request,content){

    const id = content.params.id
console.log(id)

    await mongoose.connect(connect_db).then((res)=>{
        console.log("single user post")
    })


    const obj = await showBlogs.find({uid:id})


    return NextResponse.json({
        data:obj,
        status:true,
        message:"get single user post"
    })





}




export async function DELETE(request,content){

    
    const id = content.params.id
    console.log(id)


await mongoose.connect(connect_db).then(async(res)=>{
    console.log("delete Api Working")
})


const obj = { _id:id}


const filter = await showBlogs.deleteOne(obj)


return NextResponse.json({
    data:filter,
    message:'delete Api created',
    status:true
})


}


export async function PUT(request,content){

    const data = await request.json()
    
    const id = content.params.id
    




    await mongoose.connect(connect_db).then(async(res)=>{
        console.log("edit post Api Working")
    })
    
    
    const obj = {_id:id}
    
    const filter = await  showBlogs.findOneAndUpdate( obj,data)
    




    return NextResponse.json({
        data:filter,
        message:'edit post Api Working',
        status:true
    })
    













}