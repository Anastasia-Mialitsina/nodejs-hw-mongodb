//src/index.js
import 'dotenv/config';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

//const start = async () => {
  //await initMongoConnection();
  //setupServer();
//};

//start();

const start = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

start();

