import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/user";

export async function PUT(request,{params}){
    await connectDB();
    const {id} =  await params;
    const info =  await request.json();
    const editedInfo = await User.findByIdAndUpdate(id,info);
    return  Response.json(editedInfo);
}

export async function DELETE(request,{params}){
     await connectDB();
    const {id} =  await params;
    const deletedInfo = await User.findByIdAndDelete(id);
    return  Response.json(deletedInfo);
}