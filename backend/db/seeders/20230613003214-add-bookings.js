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
          spotId: 1,
          userId: 1,
          startDate: '07/03/2021',
          endDate: '07/05/2021'
        },
        {
          spotId: 2,
          userId: 2,
          startDate: '06/03/2021',
          endDate: '08/09/2021'
        },
        {
          spotId: 3,
          userId: 3,
          startDate: '09/20/2021',
          endDate: '09/30/2021'
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
