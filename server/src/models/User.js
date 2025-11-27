import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },

    // profile
    avatar: { type: String, default: "" },
    phone: { type: String, required: true, unique: true },
    birthday: { type: Date, default: "" },
    company: { type: String, default: "" },
    address: { type: String, default: "" },

    // mail
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
    
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
