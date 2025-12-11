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
    await queryInterface.bulkInsert("user_addresses", [
      {
        user_id: 1,
        address_line1: "ShobaghpuraTemp, UdaipurTemp1",
        city: "UdaipurTemp1",
        state: "RajasthanTemp1",
        zip: "302015",
        country: "IndiaTemp1"
      },
      {
        user_id: 2,
        address_line1: "ShobaghpuraTemp, UdaipurTemp2",
        city: "UdaipurTemp2",
        state: "RajasthanTemp2",
        zip: "302015",
        country: "IndiaTemp2"
      },
      {
        user_id: 3,
        address_line1: "ShobaghpuraTemp, UdaipurTemp3",
        city: "UdaipurTemp3",
        state: "RajasthanTemp3",
        zip: "302015",
        country: "IndiaTemp3"
      },
      {
        user_id: 4,
        address_line1: "ShobaghpuraTemp, UdaipurTem4",
        city: "UdaipurTem4",
        state: "RajasthanTem4",
        zip: "302015",
        country: "IndiaTem4"
      },
      {
        user_id: 5,
        address_line1: "ShobaghpuraTemp, UdaipurTemp5",
        city: "UdaipurTemp5",
        state: "RajasthanTemp5",
        zip: "302015",
        country: "IndiaTemp5"
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
    await queryInterface.bulkDelete("user_addresses", null, {});
  }
};
