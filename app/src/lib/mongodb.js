import mongoose from "mongoose"


const MONGO_URI="mongodb://localhost:27017/testdb";

export async function connectDB(){
    if(mongoose.connection.readyState===1 ||mongoose.connection.readyState===2)return
    await mongoose.connect(MONGO_URI);
}