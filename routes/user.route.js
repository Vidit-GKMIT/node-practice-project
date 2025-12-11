const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");
const {
  validateUser,
  validateUpdateUserData
} = require("../validators/user.validator");
const validatedParams = require("../validators/params.validator");

router.get("/", validatedParams, userControllers.getAllUsers);
router.post("/", validateUser, userControllers.createUsers);
router.get("/:userId", userControllers.getUserById);
router.delete("/:userId", userControllers.deleteUser);
router.patch("/:userId", validateUpdateUserData, userControllers.updateUser);

module.exports = router;
