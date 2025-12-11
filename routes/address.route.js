const express = require("express");
const router = express.Router();
const addressControllers = require("../controllers/address.controller");
const {
  validateAddress,
  validateUpdateAddressData
} = require("../validators/address.validator");
const validateParams = require("../validators/params.validator");

router.get("/", validateParams, addressControllers.getAllAddresses);
router.post("/", validateAddress, addressControllers.createAddress);
router.get("/:userId", validateParams, addressControllers.getUserAddress);
router.delete("/:addressId", addressControllers.deleteAddress);
router.patch(
  "/:addressId",
  validateUpdateAddressData,
  addressControllers.updateAddress
);

module.exports = router;
