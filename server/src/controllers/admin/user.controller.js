import UserService from "../../services/admin/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, roleId, isVerified } = req.query;
    const result = await UserService.getUsers({ search, roleId, isVerified }, page, limit);
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "ユーザーの取得に失敗しました",
      error: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.updateUser(id, req.body);
    res.json({
      success: true,
      data: user,
      message: "ユーザー情報を更新しました"
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(error.message.includes("not found") ? 404 : 500).json({
      success: false,
      message: "ユーザーの更新に失敗しました",
      error: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.json({
      success: true,
      message: "ユーザーを削除しました"
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(error.message.includes("not found") ? 404 : 500).json({
      success: false,
      message: "ユーザーの削除に失敗しました",
      error: error.message
    });
  }
};