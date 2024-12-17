import express from "express"; // Import express
import mongoose from "mongoose"; // Import mongoose
import dotenv from "dotenv"; // Import dotenv to load .env file
import cors from "cors"; // Import cors
import bodyParser from "body-parser"; // Import bodyParser
import authRoutes from "./routes/authRoutes.js"; // Import authRoutes
import blogRoutes from "./routes/blogRoutes.js"; // Import blogRoutes

dotenv.config();

const app = express();
app.use(
  cors({
    allowedHeaders: "*",
  })
);
app.use(bodyParser.json()); // Parse incoming JSON requests

/* Connect to MongoDB using connection string from .env */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database! 🎉");
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
