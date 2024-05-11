import mongoose from "mongoose";

const ConnectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return true;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        console.log("Mongodb connected.");
        return true;
    } catch (error) {
        console.log(error);
    }
}

export default ConnectDB;