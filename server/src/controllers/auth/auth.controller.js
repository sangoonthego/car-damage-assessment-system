import { validationResult } from "express-validator";
import User from "../../models/User.js";
import * as authService from "../../services/auth.service.js"; 

export const register = async (req, res) => {
  const errors = validationResult(req);
  const { email } = req.body;

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const result = await authService.loginUser(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const result = await authService.logoutUser(token);

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
