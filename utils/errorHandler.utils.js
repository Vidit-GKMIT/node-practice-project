const errorResponse = (res, error) => {
  res.status(error.statusCode ?? 500).json({
    message: error.message ?? "Internal Server Error",
    success: false
  });
};
const customError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
module.exports = {
  customError,
  errorResponse
};
