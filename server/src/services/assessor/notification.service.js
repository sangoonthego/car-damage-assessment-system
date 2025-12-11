import Notification from "../../models/Notification.js";
import { executePaginatedQuery } from "../../models/utils/model.utils.js";

class NotificationService {
  static async getNotifications(userId, filters = {}, page = 1, limit = 20) {
    try {
      const { unreadOnly = false } = filters;

      const filter = {
        userId,
        ...(unreadOnly === "true" && { isRead: false }),
      };

      const result = await executePaginatedQuery(Notification, filter, {
        page,
        limit,
        sort: "-createdAt",
      });

      return result;
    } catch (error) {
      throw new Error(`Error fetching notifications: ${error.message}`);
    }
  }

  static async markAsRead(notificationId, userId) {
    try {
      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, userId },
        { isRead: true },
        { new: true }
      );

      if (!notification) {
        throw new Error("Notification not found");
      }

      return notification;
    } catch (error) {
      throw new Error(`Error marking notification as read: ${error.message}`);
    }
  }

  static async markAllAsRead(userId) {
    try {
      const result = await Notification.updateMany(
        { userId, isRead: false },
        { $set: { isRead: true } }
      );

      return {
        updated: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(
        `Error marking all notifications as read: ${error.message}`
      );
    }
  }

  static async createNotification(
    userId,
    message,
    type = "general",
    relatedId = null
  ) {
    try {
      const notification = await Notification.create({
        userId,
        message,
        type,
        relatedId,
        isRead: false,
      });

      return notification;
    } catch (error) {
      throw new Error(`Error creating notification: ${error.message}`);
    }
  }

  static async deleteNotification(notificationId, userId) {
    try {
      const notification = await Notification.findOneAndDelete({
        _id: notificationId,
        userId,
      });

      if (!notification) {
        throw new Error("Notification not found");
      }

      return notification;
    } catch (error) {
      throw new Error(`Error deleting notification: ${error.message}`);
    }
  }
}

export default NotificationService;
