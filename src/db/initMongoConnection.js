//src/db/initMongoConnection.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  const { MONGODB_URL } = process.env;

  //const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection failed:', error.message);
    process.exit(1);
  }
};
