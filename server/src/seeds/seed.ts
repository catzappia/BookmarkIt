import db from "../config/connection.js";
import models from "../models/index.js";
import cleanDB from "./cleanDB.js";

const { User } = models;

import userData from './userData.json' assert { type: "json" };

const connection = await db();
connection.once('open', async () => {
  await cleanDB('User', 'users');

  await User.insertMany(userData);

  console.log('Users Seeded!');
  process.exit(0);
});
