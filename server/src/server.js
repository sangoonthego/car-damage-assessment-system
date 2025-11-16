import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/ai.routes.js";

dotenv.config();

const app = express();
app.use(cors());

connectDB();

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), process.env.UPLOAD_DIR)));
app.use("/static", express.static(path.join(process.cwd(), process.env.STATIC_DIR)));

app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 3636;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
