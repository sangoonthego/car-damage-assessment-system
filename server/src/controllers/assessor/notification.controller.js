import NotificationService from "../../services/assessor/notification.service.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, unreadOnly = false } = req.query;

    const result = await NotificationService.getNotifications(
      userId,
      { unreadOnly },
      page,
      limit
    );

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      success: false,
      message: "通知の取得に失敗しました",
      error: error.message
    });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await NotificationService.markAsRead(id, userId);

    res.json({
      success: true,
      data: notification,
      message: "Notification marked as read"
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(error.message.includes("not found") ? 404 : 500).json({
      success: false,
      message: "通知の更新に失敗しました",
      error: error.message
    });
  }
};