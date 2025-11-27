// services/costEstimate.service.js
import CostEstimate from "../models/CostEstimate.js";
import DamageReport from "../models/DamageReport.js";
import { calculateMaskArea } from "../utils/areaCalculator.js";
import NotificationService from "./notification.service.js";
import BillService from "./bill.service.js";

class CostEstimateService {
  static async createCostEstimate({ damageReportId, createdBy, aiData, notes }) {
    // check DamageReport
    const report = await DamageReport.findById(damageReportId);
    if (!report) throw new Error("Damage report not found!");

    // cal area from mask + ref
    const { area_m2, scaleFactor } = calculateMaskArea(
      aiData.maskPixelCount,
      aiData.referenceUsed.refPixelCount,
      aiData.referenceUsed.refRealArea_m2
    );

    aiData.maskArea_m2 = area_m2;
    aiData.referenceUsed.scaleFactor = scaleFactor;

    // Rule-based repairItems 
    const repairItems = aiData.classes.map(cls => ({
      partName: cls.name,
      action: "repair",
      quantity: 1,
      unitCost: 1000000 * area_m2, 
      laborHours: 2,
      laborRatePerHour: 200000,
      totalCost: 1000000 * area_m2 + 2 * 200000
    }));

    const subTotal = repairItems.reduce((acc, item) => acc + item.totalCost, 0);
    const tax = subTotal * 0.1;
    const totalEstimate = subTotal + tax;

    const costEstimate = await CostEstimate.create({
      damageReportId,
      createdBy,
      ai: aiData,
      repairItems,
      subTotal,
      tax,
      totalEstimate,
      notes,
      status: "Draft"
    });

    return costEstimate;
  }

  static async approveEstimate(costEstimateId) {
    const estimate = await CostEstimate.findById(costEstimateId);
    if (!estimate) throw new Error("Cost estimate not found!");
    estimate.status = "Approved";
    await estimate.save();

    // Auto-generate Bill
    const bill = await BillService.createBill({
      damageReportId: estimate.damageReportId,
      amount: estimate.totalEstimate,
      paymentMethod: "Online"
    });

    // Auto-notification user
    await NotificationService.sendNotification({
      userId: estimate.damageReportId.userId,
      message: `Your damage repair cost has been approved. Bill amount: ${bill.amount}`
    });

    return { estimate, bill };
  }

  static async getEstimateByDamageReport(damageReportId) {
    return await CostEstimate.find({ damageReportId }).populate("damageReportId").populate("createdBy");
  }
}

export default CostEstimateService;
