import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/user";

export async function GET(){
    await connectDB();
    const info = await User.find();
    return  Response.json(info)
}
export async function POST(request){
    await connectDB();
    const newData = await request.json();

    const newInfo = await User.create(newData);
    return  Response.json(newInfo);
}