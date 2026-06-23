import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB CONNECTED")
    } catch (error) {
        console.log("ERROR IN DB CONNECT: ", error)
    }
}

export default ConnectDB;