import express from "express";
import cors from "cors";
import db from "./db.js";
import adminRoutes from "./routes/adminRoutes.js"; // make sure path is correct
import productRoutes from "./routes/productsRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // MUST be before routes

// Register admin routes
app.use("/admin", adminRoutes);

app.use("/products", productRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});






