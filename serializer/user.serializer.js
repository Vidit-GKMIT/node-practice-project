const serializeUser = (payload, limit, page, remainingPage) => {
  const modifiedData = payload.map((obj) => {
    return {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      contact: obj.contact,
      createdAt: obj.created_at,
      updatedAt: obj.updated_at
    };
  });
  return modifiedData;
};

const serializeCreateduser = (payload) => {
  const modifiedData = {
    id: payload.id,
    name: payload.name,
    email: payload.email,
    contact: payload.email,
    createdAt: payload.created_at,
    updatedAt: payload.updated_at
  };
  return modifiedData;
};

const serializeUserFromId = (payload) => {
  const modifiedData = {
    id: payload.id,
    name: payload.name,
    email: payload.email,
    contact: payload.contact,
    createdAt: payload.created_at,
    updatedAt: payload.updated_at
  };
  return modifiedData;
};

module.exports = { serializeUser, serializeCreateduser, serializeUserFromId };
