import mongoose from "mongoose";

const RepairItemSchema = new mongoose.Schema({
  partName: { type: String },
  action: { type: String },
  unit: { type: String, default: "item" },
  quantity: { type: Number, default: 1 },
  unitCost: { type: Number, default: 0 },
  laborHours: { type: Number, default: 0 },
  laborRatePerHour: { type: Number, default: 0 },
  totalCost: { type: Number, default: 0 }
});

const CostEstimateSchema = new mongoose.Schema({
  damageReportId: { type: mongoose.Schema.Types.ObjectId, ref: "DamageReport", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // AI hoặc Assessor
  createdAt: { type: Date, default: Date.now },

  ai: {
    type: { type: String }, // classification/detection/segmentation
    classes: [{ name: String, confidence: Number }],
    maskPixelCount: Number,
    maskArea_m2: Number,
    referenceUsed: {
      type: String,
      refPixelCount: Number,
      refRealArea_m2: Number,
      scaleFactor: Number
    },
    confidence: Number
  },

  repairItems: [RepairItemSchema],

  subTotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalEstimate: { type: Number, default: 0 },

  notes: { type: String },

  status: { type: String, enum: ["Draft", "PendingApproval", "Approved", "Rejected"], default: "Draft" }
});

export default mongoose.model("CostEstimate", CostEstimateSchema);
