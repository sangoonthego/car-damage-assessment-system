import { Router } from "express";
import {
  createBill,
  getBillById,
  getBillsByUser,
  updateBillStatus,
  deleteBill
} from "../controllers/bill.controller.js";

const router = Router();

// CREATE bill
router.post("/", createBill);

// GET one bill
router.get("/:id", getBillById);

// GET all bills of a user
router.get("/user/:userId", getBillsByUser);

// UPDATE status or payment method
router.put("/:id", updateBillStatus);

// DELETE bill
router.delete("/:id", deleteBill);

export default router;
