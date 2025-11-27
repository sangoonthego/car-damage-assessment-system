import express from "express";
import { body } from "express-validator";

import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
const emailRegex = /^[A-Za-z0-9._%+-]{6,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const nameRegex = /^[A-Z][a-z A-Z]*$/;

router.post(
  "/register",
  [
    body("username")
      .notEmpty().withMessage("Username is required")
      .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("firstname")
      .notEmpty().withMessage("First name is required")
      .matches(nameRegex).withMessage("First name must start with uppercase and contain only letters"),
    body("lastname")
      .notEmpty().withMessage("Last name is required")
      .matches(nameRegex).withMessage("Last name must start with uppercase and contain only letters"),
    body("email")
      .notEmpty().withMessage("Email is required")
      .matches(emailRegex).withMessage("Email must have '@' and at least 6 letters before it"),
    body("password")
      .notEmpty().withMessage("Password is required")
      .matches(passwordRegex).withMessage("Password must contain at least one uppercase letter and one number"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email")
      .notEmpty().withMessage("Email is required")
      .matches(emailRegex).withMessage("Invalid email format"),
    body("password")
      .notEmpty().withMessage("Password is required"),
  ],
  login
);

export default router;
