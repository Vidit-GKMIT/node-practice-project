const createKey = (resource, page, limit) => {
  return `${resource}_page:${page}_limit:${limit}`;
};

module.exports = { createKey };
