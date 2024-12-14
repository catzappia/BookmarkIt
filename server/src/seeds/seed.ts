import db from "../config/connection.js";
import User from "../models/User.js";
// import cleanDB from "./cleanDB.js";
import userData from './userData.json' with { type: "json" };



const seedDB = async () => {
  try {
    await db().then((d) => d.dropCollection('users'));
   

    await User.create(userData);

    console.log("Data seeded successfully!");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seedDB();