import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/ai.routes.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import billRoutes from "./routes/bill.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import damageReportRoutes from "./routes/damageReport.routes.js";
import manualAssessmentRoutes from "./routes/manualAssessment.routes.js";
import costEstimateRoutes from "./routes/costEstimate.routes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), process.env.UPLOAD_DIR)));
app.use("/static", express.static(path.join(process.cwd(), process.env.STATIC_DIR)));

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/bills", billRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/damage-reports", damageReportRoutes);
app.use("/api/manual-assessment", manualAssessmentRoutes);
app.use("/api/cost", costEstimateRoutes);

const PORT = process.env.PORT || 3636;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
