import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect_db } from "../../config/db";
import {product} from '../../config/Model/SignupSchema'

export async function GET(){


await mongoose.connect(connect_db).then((res)=>{
    console.log("Get api Connect")
})

const filter = await product.find()





return NextResponse.json({
    data:filter,
    status:true

})



}




