const { User } = require("../models");
const {
  serializeUser,
  serializeCreateduser,
  serializeUserFromId
} = require("../serializer/user.serializer");
const { getCache, setCache, deleteCache } = require("../utils/cache.utils");
const { createKey } = require("../utils/redis.keys.utils");
const { customError } = require("../utils/errorHandler.utils");
const { paginationDetails } = require("../utils/pagination.utils");

const getAllUsers = async (page, limit) => {
  const offset = (page - 1) * limit;
  let data = null;
  let paginationData = null;
  const redisKey = createKey("user", page, limit);

  let cacheData = await getCache(redisKey);

  if (cacheData) {
    data = JSON.parse(cacheData);
  } else {
    //   data = await User.findAll({
    //   limit: limit,
    //   offset: offset
    // });
    const { count: total, rows } = await User.findAndCountAll({
      limit,
      offset,
      raw: true
    });

    data = rows;
    paginationData = paginationDetails(limit, page, total);
    setCache(redisKey, data);
  }

  if (!data.length) {
    const error = customError("No user found", 404);
    throw error;
  }
  const modifiedData = serializeUser(data);
  return { modifiedData, paginationData };
};

const createUser = async (payload) => {
  const { name, email, contact } = payload;
  const data = await User.create({
    name,
    email,
    contact
  });
  const modifiedData = serializeCreateduser(data);
  return modifiedData;
};

const getUserById = async (userId) => {
  if (!userId) {
    const error = customError("No user id found", 400);
    throw error;
  }
  const data = await User.findByPk(userId);

  if (!data) {
    const error = customError("No user found", 404);
    throw error;
  }
  const modifiedData = serializeUserFromId(data);
  return modifiedData;
};

const deleteUser = async (userId) => {
  if (!userId) {
    const error = customError("No user id found", 400);
    throw error;
  }
  const id = userId;
  const existinguser = await User.findAll({
    where: {
      id
    }
  });

  if (!existinguser.length) {
    const error = customError("No user id with this id found");
    error.statusCode = 404;
    throw error;
  }

  const deletedUser = await User.destroy({
    where: {
      id
    }
  });
  await deleteCache("user");
  return deletedUser;
};

const udapteUser = async (userId, payload) => {
  if (!userId) {
    const error = customError("No user id found", 400);
    throw error;
  }

  const existinguser = await User.findByPk(userId);

  if (!existinguser) {
    const error = customError("No user found by this id", 404);
    throw error;
  }

  const { name, contact } = payload;

  const updatedData = await User.update({ name, contact }, { where: { id } });
  await deleteCache("user");
  return updatedData;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  udapteUser
};
