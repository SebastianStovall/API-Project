'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Booking } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      options.tableName = 'Bookings';
      await Booking.bulkCreate([
        {
          spotId: 2,
          userId: 1,
          startDate: '2024-06-03',
          endDate: '2024-08-09'
        },
        {
          spotId: 3,
          userId: 2,
          startDate: '2021-07-03',
          endDate: '2021-07-05'
        },
        {
          spotId: 1,
          userId: 3,
          startDate: '2021-09-20',
          endDate: '2021-09-30'
        }
      ], {validate: true})

    } catch(e) {
      // this might cause problems later. figure it out lol
      throw e.errors
    }

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['07/03/2023', '08/11/2023', '09/22/2023'] }
    }, {});
  }
};
