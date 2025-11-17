import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/ai.routes.js";
import authRoutes from "./routes/auth.routes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), process.env.UPLOAD_DIR)));
app.use("/static", express.static(path.join(process.cwd(), process.env.STATIC_DIR)));

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 3636;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
