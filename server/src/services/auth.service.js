import User from "../models/User.js";
import Role from "../models/Role.js";
import BlacklistToken from "../models/BlacklistToken.js";
import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// gen otp
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const registerUser = async ({ firstname, lastname, username, email, password, phone }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(password, 10);

  const defaultRole = await Role.findOne({ name: "Client" });
  if (!defaultRole) throw new Error("Default role 'Client' not found");

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    passwordHash: hashed,
    phone,
    roleId: defaultRole._id,
    otp,
    otpExpires,
    isVerified: false
  });

  // create JWT
  const token = jwt.sign(
    { id: user._id, role: defaultRole.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // return {
  //   id: user._id,
  //   username: user.username,
  //   email: user.email,
  //   roleId: user.roleId,
  // };

  return {
    success: true,
    userId: user._id,
    token,
  }
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).populate("roleId");
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user._id, role: user.roleId.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  //const roleValue = user.roleId.name === "Admin" ? 2 : 1;
  const roleMap = {
    "Client": 1,
    "Admin": 2,
    "Assessor": 3
  };

  const roleValue = roleMap[user.roleId.name] || 0;

  return {
    success: true,
    token,
    user: {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roleId: user.roleId, // đã populated
    },
  };
};

export const logoutUser = async (token) => {
  if (!token) throw new Error("No token Provided!!!");

  const decoded = jwt.decode(token);
  if (!decoded) throw new Error("Invalid Token!!!");

  await BlacklistToken.create({
    token,
    expiresAt: new Date(decoded.exp * 1000) // time org expire
  });

  return {
    success: true,
    message: "Logged out Successfully!!!"
  };
};