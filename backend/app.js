import express from "express";
import "dotenv/config";
import dbConnect from "./dbConnect.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to BookStore</h1>");
});

app.use("/api/v1/books", bookRoutes);

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URL);
    console.log("Database Connected Successfully...");
    app.listen(PORT, () => {
      // iife function=>immediate invoked function expression
      console.log(`Server is running at port: ${PORT}`);
    });
  } catch (error) {
    console.log("Error in DB Connect", error);
  }
};

start();
