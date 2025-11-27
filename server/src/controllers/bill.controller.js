import BillService from "../services/bill.service.js";

export const createBill = async (req, res) => {
  try {
    const bill = await BillService.createBill(req.body);
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getBillById = async (req, res) => {
  try {
    const bill = await BillService.getBillById(req.params.id);
    res.json(bill);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getBillsByUser = async (req, res) => {
  try {
    const bills = await BillService.getBillsByUser(req.params.userId);
    res.json(bills);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBillStatus = async (req, res) => {
  try {
    const bill = await BillService.updateBillStatus(req.params.id, req.body);
    res.json(bill);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const bill = await BillService.deleteBill(req.params.id);
    res.json({ message: "Bill deleted", bill });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
