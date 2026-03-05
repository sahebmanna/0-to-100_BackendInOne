import mongoose from "mongoose";
import { DB_NAME } from "./constants";


// import express from "express";

// const app = express();



// ;
// (async() => {
//     try {
//         awit mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("ERROR: ", error);
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App running on http://localhost:${process.env.PORT}`);

//         })
//     } catch (e) {
//         console.error("error", e);
//         throw error;
//     }
// })()