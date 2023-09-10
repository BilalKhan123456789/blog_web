import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connect_db} from "../../config/db"
import {product} from "../../config/Model/SignupSchema"




export async function POST(request){


    const data = await request.json()


await mongoose.connect(connect_db).then(async(res)=>{
    console.log("login Post connect")
})


console.log(data)


const filter = await product.findOne(data)


if(filter!=null){
    return NextResponse.json({
        data:filter,
        status:true,
        message:"working"
    
    })
}else{
    return NextResponse.json({
        message:"please enter correct Details",
        status:false
    
    })
}


}