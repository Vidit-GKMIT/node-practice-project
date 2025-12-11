const successResponse = (
  res,
  data = null,
  message,
  statusCode,
  paginationData = null
) => {
  let result = {
    data,
    message,
    success: true
  };
  if (paginationData) {
    result.paginationData = paginationData;
  }

  res.status(statusCode).json(result);
};

module.exports = {
  successResponse
};
