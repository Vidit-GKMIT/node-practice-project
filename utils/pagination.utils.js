const paginationDetails = (limit, page, total) => {
  const remain = Math.floor(
    (total - Number(page) * Number(limit)) / Number(limit)
  );
  const remainingPage = remain > 0 ? remain : 0;
  return { remainingPage, page, total };
};

module.exports = { paginationDetails };
