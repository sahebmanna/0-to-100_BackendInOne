//require('dotenv').config({ path: './env' }) //its a old version

import dotenv from "dotenv";
import connectDB from "./db/index.js";

import { app } from "./app.js";

//import express from "express";

dotenv.config({
  path: "./env",
});

//const app = express();

connectDB()
  .then(() => {
    app.on("Error", (error) => {
      console.log("Error", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running on port  http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch(() => {
    console.log(`Database connection Error`);
  });

/*
;(async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App running on http://localhost:${process.env.PORT}`);

        })
    } catch (e) {
        console.error("error", e);
        throw error;
    }
})()
    */
