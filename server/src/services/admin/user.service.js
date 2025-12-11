import User from "../../models/User.js";
import { executePaginatedQuery, buildFilterQuery } from "../../models/utils/model.utils.js";

class UserService {
  static async getUsers(filters = {}, page = 1, limit = 10) {
    try {
      const { search, roleId, isVerified } = filters;

      const filter = buildFilterQuery({
        ...(search && {
          $or: [
            { firstname: { $regex: search, $options: 'i' } },
            { lastname: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { username: { $regex: search, $options: 'i' } }
          ]
        }),
        ...(roleId && { roleId }),
        ...(isVerified !== undefined && { isVerified: isVerified === 'true' })
      });

      const result = await executePaginatedQuery(User, filter, {
        page,
        limit,
        sort: '-createdAt',
        populate: 'roleId',
        select: '-passwordHash -otp -otpExpires'
      });

      return result;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  static async updateUser(userId, updates) {
    try {
      // Remove sensitive fields
      delete updates.passwordHash;
      delete updates.otp;
      delete updates.otpExpires;

      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
      ).populate('roleId').select('-passwordHash -otp -otpExpires');

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default UserService;
