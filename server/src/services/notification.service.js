import Notification from "../models/Notification.js";

class NotificationService {
  static async createNotification({ userId, message }) {
    if (!userId) throw new Error("UserId is required!");
    if (!message) throw new Error("Message is required!");

    const noti = await Notification.create({
      userId,
      message,
      read: false,
    });

    return noti;
  }

  static async getNotificationsByUser(userId) {
    const noti = await Notification.find({ userId }).sort({ createdAt: -1 });
    return noti;
  }

  static async markAsRead(notificationId) {
    const noti = await Notification.findById(notificationId);
    if (!noti) throw new Error("Notification not found!");

    noti.read = true;
    await noti.save();

    return noti;
  }

  static async markAllAsRead(userId) {
    const result = await Notification.updateMany(
      { userId, read: false },
      { $set: { read: true } }
    );

    return { updated: result.modifiedCount };
  }

  static async deleteNotification(notificationId) {
    const noti = await Notification.findByIdAndDelete(notificationId);
    if (!noti) throw new Error("Notification not found!");

    return noti;
  }
}

export default NotificationService;
