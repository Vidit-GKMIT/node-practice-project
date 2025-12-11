"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", [
      {
        name: "ViditTemp",
        email: "viditTemp2@gmail.com",
        contact: "3459872346"
      },
      {
        name: "DikshantTemp",
        email: "dikshantTemp1@gmail.com",
        contact: "1234723546"
      },
      {
        name: "DivyaTemp",
        email: "divyaTemp1@gmail.com",
        contact: "7384754578"
      },
      {
        name: "GovindTemp",
        email: "GovindTemp1@gmail.com",
        contact: "4592348260"
      },
      {
        name: "AnkurTemp",
        email: "ankurTemp1@gmail.com",
        contact: "8645684567"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  }
};
