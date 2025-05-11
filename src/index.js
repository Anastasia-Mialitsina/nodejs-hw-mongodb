//src/index.js
import 'dotenv/config';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection';

const start = async () => {
  await initMongoConnection();
  setupServer();
};

start();
