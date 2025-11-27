import Bill from "../models/Bill.js";
import DamageReport from "../models/DamageReport.js";

class BillService {
  async createBill({ damageReportId, amount, paymentMethod }) {
    const report = await DamageReport.findById(damageReportId);
    if (!report) throw new Error("Damage Report not found!");

    const bill = await Bill.create({
      damageReportId,
      amount,
      paymentMethod,
      status: "Pending"
    });

    return bill;
  }

  async getBillById(billId) {
    const bill = await Bill.findById(billId).populate("damageReportId");
    if (!bill) throw new Error("Bill not found!");
    return bill;
  }

  async getBillsByUser(userId) {
    const bills = await Bill.find().populate({
      path: "damageReportId",
      match: { userId: userId }
    });

    return bills.filter(b => b.damageReportId !== null);
  }

  async updateBillStatus(billId, { status, paymentMethod }) {
    const bill = await Bill.findById(billId);
    if (!bill) throw new Error("Bill not found!");

    bill.status = status || bill.status;
    bill.paymentMethod = paymentMethod || bill.paymentMethod;

    if (status === "Paid") {
      bill.paidAt = new Date();
    }

    await bill.save();
    return bill;
  }

  async deleteBill(billId) {
    const bill = await Bill.findByIdAndDelete(billId);
    if (!bill) throw new Error("Bill not found!");
    return bill;
  }
}

export default new BillService();
