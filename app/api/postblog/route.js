import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {showBlogs} from "../../config/Model/PostblogSchema"
import {connect_db} from "../../config/db"


export async function POST(request,content){

    const data = await request.json()


    await mongoose.connect(connect_db).then((res)=>{
        console.log("Blog Post connect")
    })

    const res = showBlogs(data)



    if(data.title=="" || data.message==""){
    


        return NextResponse.json({
            data:"no data found",
            status:false,
            message:"No Post Uploaded"
            })

  
        

    }else{
        const filter = await res.save()

        
        return NextResponse.json({
            data:filter,
            status:true,
            message:"Successfully Blog Uploaded"
        
            })
    }


 


}







export async function GET(){

    await mongoose.connect(connect_db).then((res)=>{
        console.log("Blog GET connect")
    })


    const res = await showBlogs.find()


    return NextResponse.json({
        data:res,
        status:true,
        message:"Get data"
    })






}


