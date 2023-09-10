import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect_db } from "../../../config/db";
import {product} from '../../../config/Model/SignupSchema'
import { showBlogs } from "@/app/config/Model/PostblogSchema";



export async function GET(request,content){
const id =content.params.id

await mongoose.connect(connect_db).then((res)=>{
    console.log("Get api Connect")
})

const filter = await product.findOne({_id:id})





return NextResponse.json({
    data:filter,
    status:true

})



}


export async function PUT(request,content){

    const data = await request.json()
    
    const id = content.params.id
    
    
    await mongoose.connect(connect_db).then((res)=>{
        console.log("put api connected")
    })
    




    
    const obj = {_id:id}
    
    const filter = await  product.findOneAndUpdate( obj,data)
    
    
    
    return NextResponse.json({
        data:filter,
        status:true,
        message:"data Updated"
    })
    
    
    
    }
    


   