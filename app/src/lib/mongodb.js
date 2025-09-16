import mongoose from "mongoose"


const MONGO_URI="mongodb+srv://niranjancse2023:niranjanzod@cluster0.o5clepr.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0";

export async function connectDB(){
    if(mongoose.connection.readyState===1 ||mongoose.connection.readyState===2)return
    await mongoose.connect(MONGO_URI);
}