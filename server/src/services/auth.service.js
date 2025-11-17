import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async ({ firstname, lastname, username, email, password, phone }) => {
  const hashed = await bcrypt.hash(password, 10);
  const defaultRole = await Role.findOne({ name: "Client" });
  if (!defaultRole) throw new Error("Default role 'Client' not found");

  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    passwordHash: hashed,
    phone,
    roleId: defaultRole._id,
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
    roleValue,
    userId: user._id,
    token,
  };
};