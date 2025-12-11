const serializeAddress = (payload) => {
  const modifiedData = payload.map((obj) => {
    return {
      id: obj.id,
      userId: obj.user_id,
      addressLine1: obj.address_line1,
      city: obj.city,
      state: obj.state,
      zip: obj.zip,
      country: obj.country,
      createdAt: obj.created_at,
      updatedAt: obj.updated_at
    };
  });
  return modifiedData;
};

const serializeCreatedData = (payload) => {
  const modifiedData = {
    id: payload.id,
    userId: payload.user_id,
    addressLine1: payload.address_line1,
    city: payload.city,
    state: payload.state,
    zip: payload.zip,
    createdAt: payload.created_at,
    updatedAt: payload.updated_at
  };
  return modifiedData;
};

const serializeUserAdress = (payload) => {
  const modifiedData = payload.map((obj) => {
    return {
      id: obj.id,
      userId: obj.user_id,
      addressLine1: obj.address_line1,
      city: obj.city,
      state: obj.state,
      zip: obj.zip,
      country: obj.country,
      createdAt: obj.created_at,
      updatedAt: obj.updated_at
    };
  });
  return modifiedData;
};

module.exports = {
  serializeAddress,
  serializeCreatedData,
  serializeUserAdress
};
