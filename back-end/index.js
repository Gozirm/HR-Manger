import express from "express";
import dotenv from "dotenv";
import { connect } from "./lib/db.js";
import authRoute from "./routes/authRoutes.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors" 

dotenv.config();
const app = express();
const port = process.env.PORT || 4020;

app.use(cors())
app.use(fileUpload({ useTempFiles: true }));
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "server is live" });
});

app.use(express.json());
// API's

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETE,
});

//
app.use("/api/auth", authRoute);

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`http://localhost:${port}`);
      });
    } catch (error) {
      console.log("can not connect to server" + error.message);
    }
  })
  .catch((error) => {
    console.log("invalid database connection" + error.message);
  });
