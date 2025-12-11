"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: "AddressLink",
        foreignKey: "user_id",
        targetKey: "id"
      });
    }
  }
  UserAddress.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      address_line1: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      city: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      state: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      zip: {
        type: DataTypes.STRING(6),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "UserAddress",
      tableName: "user_addresses"
    }
  );
  return UserAddress;
};
