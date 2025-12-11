const addressService = require("../services/address.service");
const { errorResponse } = require("../utils/errorHandler.utils");
const { successResponse } = require("../utils/successHandler.utils");
const createAddress = async (req, res) => {
  try {
    const payload = req.validatedData;
    await addressService.createAddress(payload);
    return successResponse(
      res,
      (data = null),
      "Data created successfully",
      201
    );
  } catch (err) {
    return errorResponse(res, err);
  }
};

const getAllAddresses = async (req, res) => {
  try {
    const page = req.validatedParams.page ?? 1;
    const limit = req.validatedParams.limit ?? 10;
    const data = await addressService.getAllAddresses(page, limit);

    return successResponse(
      res,
      data,
      "All addresses fetched successfully",
      200
    );
  } catch (err) {
    return errorResponse(res, err);
  }
};

const getUserAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = req.validatedParams.page ?? 1;
    const limit = req.validatedParams.limit ?? 10;
    data = await addressService.getUserAddress(userId, page, limit);
    return successResponse(
      res,
      data,
      "All addresses fetched successfully for this user",
      200
    );
  } catch (err) {
    return errorResponse(res, err);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    await addressService.deleteAddress(addressId);
    return successResponse(
      res,
      (data = null),
      "Address deleted successfully",
      200
    );
  } catch (err) {
    return errorResponse(res, err);
  }
};

const updateAddress = async (req, res) => {
  try {
    await addressService.updateAddress(req.params.addressId, req.validatedData);
    return successResponse(
      res,
      (data = null),
      "Address updated successfully",
      200
    );
  } catch (err) {
    return errorResponse(res, err);
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  getUserAddress,
  deleteAddress,
  updateAddress
};
