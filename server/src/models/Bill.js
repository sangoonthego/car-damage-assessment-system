import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  damageReportId: { type: mongoose.Schema.Types.ObjectId, ref: "DamageReport", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Paid", "Unpaid"], default: "Pending" },
  paymentMethod: { type: String, enum: ["Cash", "Card", "Online"], default: "Online" },
  paidAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Bill", billSchema);
