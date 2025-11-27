import mongoose from "mongoose";

const BlacklistTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

// auto delete token
BlacklistTokenSchema.index({ expiresAt: 1 }, { expireAfterSecondes: 0 }); 

export default mongoose.model("BlacklistToken", BlacklistTokenSchema);