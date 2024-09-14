import express from "express";
import movieRouter from "./src/movie/movie.routes.js";
import dotenv from "dotenv";
import connection from "./src/db/connection.js";
import cors from "cors";

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json()); // To parse JSON data
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(cors("http://localhost:5173/"));
// Serve images from the uploads directory
app.use("/server/uploads", express.static("uploads"));
// Routers
app.use("/api/movie", movieRouter);

dotenv.config();
connection()
  .then(() => {
    app.listen(process.env.PORT || 4000);
    //listening to error event
    app.on("error", () => {
      console.log("error");
      throw error;
    });
    console.log("server is running at port: " + process.env.PORT);
  })
  .catch((err) => console.log("mongodb connection failed!!", err));
