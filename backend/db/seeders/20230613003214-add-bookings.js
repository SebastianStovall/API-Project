'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '07/03/2023',
        endDate: '07/05/2023'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '08/11/2023',
        endDate: '08/15/2023'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '09/22/2023',
        endDate: '09/30/2023'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['07/03/2023', '08/11/2023', '09/22/2023'] }
    }, {});
  }
};
