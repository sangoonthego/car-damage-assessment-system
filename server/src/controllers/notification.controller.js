import NotificationService from "../services/notification.service.js";

export const createNotification = async (req, res) => {
  try {
    const noti = await NotificationService.createNotification(req.body);
    res.status(201).json(noti);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const noti = await NotificationService.getNotificationsByUser(req.params.userId);
    res.json(noti);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const noti = await NotificationService.markAsRead(req.params.id);
    res.json(noti);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const result = await NotificationService.markAllAsRead(req.params.userId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const noti = await NotificationService.deleteNotification(req.params.id);
    res.json({ message: "Notification deleted", noti });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
