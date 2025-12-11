const userService = require("../services/user.service");
const { errorResponse } = require("../utils/errorHandler.utils");
const { successResponse } = require("../utils/successHandler.utils");

const getAllUsers = async (req, res) => {
  try {
    const page = req.validatedParams.page ?? 1;
    const limit = req.validatedParams.limit ?? 10;
    const allUsersDetails = await userService.getAllUsers(page, limit);
    return successResponse(
      res,
      allUsersDetails.modifiedData,
      "Data fetched successfully",
      200,
      allUsersDetails.paginationData
    );
  } catch (err) {
    return errorResponse(res, err);
  }
};

const createUsers = async (req, res) => {
  try {
    const payload = req.validatedData;
    await userService.createUser(payload);
    return successResponse(
      res,
      (data = null),
      "Data created successfully",
      200
    );
  } catch (err) {
    return errorResponse(res, err);
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await userService.getUserById(userId);
    return successResponse(res, data, "User fetched successfully", 200);
  } catch (err) {
    return errorResponse(res, err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await userService.deleteUser(userId);
    return successResponse(
      res,
      (data = null),
      "User deleted successfully",
      200
    );
  } catch (err) {
    return errorResponse(res, err);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await userService.udapteUser(userId, req.validatedData);
    return successResponse(
      res,
      (data = null),
      "User updated successfully",
      200
    );
  } catch (err) {
    return errorResponse(res, err);
  }
};

module.exports = {
  createUsers,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser
};
