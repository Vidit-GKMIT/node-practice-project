const { UserAddress } = require("../models");
const { User } = require("../models");
const {
  serializeAddress,
  serializeCreatedData,
  serializeUserAdress
} = require("../serializer/address.serializer");
const { getCache, setCache, deleteCache } = require("../utils/cache.utils");
const { createKey } = require("../utils/redis.keys.utils");
const { customError } = require("../utils/errorHandler.utils");

const getAllAddresses = async (page, limit) => {
  const offset = (page - 1) * limit;
  const redisKey = createKey("address", page, limit);
  let allAddresses = null;
  let cachedData = await getCache(redisKey);
  if (cachedData) {
    allAddresses = JSON.parse(cachedData);
  } else {
    allAddresses = await UserAddress.findAll({
      limit: limit,
      offset: offset
    });
    setCache(redisKey, allAddresses);
  }
  if (!allAddresses.length) {
    const error = customError("No addresses found", 404);
    throw error;
  }
  const modifiedData = serializeAddress(allAddresses);
  return modifiedData;
};

const getUserAddress = async (userId, page, limit) => {
  if (!userId) {
    const error = customError("User Id is undefined");
    throw error;
  }
  const existingUser = await User.findByPk(userId);

  if (!existingUser) {
    const error = customError("No user found by this id", 404);
    throw error;
  }

  const offset = (page - 1) * limit;
  const redisKey = createKey("user_address", page, limit);
  let addresses = null;
  let cachedData = await getCache(redisKey);
  if (cachedData) {
    addresses = JSON.parse(cachedData);
  } else {
    addresses = await UserAddress.findAll({
      limit: limit,
      offset: offset,
      where: {
        user_id: id
      }
    });
    setCache(redisKey, addresses);
  }

  if (!addresses.length) {
    const error = customError("No addresses for this user", 404);
    throw error;
  }
  const modifiedData = serializeUserAdress(addresses);
  return modifiedData;
};

const createAddress = async (payload) => {
  const { user_id, address_line1, city, state, zip, country } = payload;
  const existingUser = await User.findByPk(user_id);
  if (!existingUser) {
    const error = customError(
      "No user with this id exist, can't create address",
      404
    );
    throw error;
  }
  const createdAddress = await UserAddress.create({
    user_id,
    address_line1,
    city,
    state,
    zip,
    country
  });
  const modifiedData = serializeCreatedData(createdAddress);
  return modifiedData;
};

const deleteAddress = async (addressId) => {
  if (!addressId) {
    const error = customError("No address id found", 400);
    throw error;
  }

  const existingAddress = await UserAddress.findByPk(addressId);

  if (!existingAddress) {
    const error = customError("No address with this id found", 404);
    throw error;
  }

  const deletedAddress = await UserAddress.destroy({
    where: {
      id: addressId
    }
  });
  deleteCache("user_address");
  return deletedAddress;
};

const updateAddress = async (addressId, payload) => {
  if (!addressId) {
    const error = customError("No address id found", 404);
    throw error;
  }

  const existingAddress = await UserAddress.findByPk(addressId);

  if (!existingAddress) {
    const error = customError("No address found by this id", 404);
    throw error;
  }
  await UserAddress.update(
    {
      payload
    },
    { where: { id: addressId } }
  );
  deleteCache("user_address");
  return null;
};

module.exports = {
  getAllAddresses,
  createAddress,
  getUserAddress,
  deleteAddress,
  updateAddress
};
