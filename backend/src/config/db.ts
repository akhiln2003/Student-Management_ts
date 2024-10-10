import mongoose from 'mongoose';
import second from 'dotenv'

const connectDB = async ()=>{
   
    
    try {
        const con = await mongoose.connect(process.env.MONGO_URL as string);
        console.log(` Connected MongoDB ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDB