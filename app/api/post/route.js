import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connect_db}  from "../../config/db"
import {product} from "../../config/Model/SignupSchema"



export async function POST(request){

    const allData = await request.json()



    await mongoose.connect(connect_db).then((res)=>{
        console.log("post api Connect")
    })
    
    const check = await product.findOne({email:allData.email})
    console.log(check)
      
    
    if(check==null){
      
          const filter = product(allData);
          console.log(filter,"if condition working")
    
    
    
        const data1 = await filter.save();
    
        return NextResponse.json({
          data: data1,
          status: true,
          message: "Successfully Signup",
        });
        
      }else{
        return NextResponse.json({
            data:[],
            status:false,
            message:"user already registered"
        })
      }
    













}