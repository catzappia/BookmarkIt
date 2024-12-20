import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookmarkit')
        console.log('Database connected');
        return mongoose.connection;
    } catch (err) {
        console.log('Error connection to the database', err);
        throw new Error('Error connecting to database');
    }
};

export default db