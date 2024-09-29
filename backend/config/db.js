import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import logger from "../utils/logger.js";


configDotenv()
const mongo_uri = process.env.MONGO_URI
export const port = process.env.PORT

const connectDB = async () => {
    return mongoose
    .connect(mongo_uri)
    .then(() => logger.info("Connected to the database successfully"))
    .catch((error) =>logger.info(`Unable to connect to the database ${error}`))

}

export default connectDB