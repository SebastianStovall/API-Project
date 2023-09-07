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
          startDate: '2024-06-03',
          endDate: '2024-08-09',
          guests: 1
        },
        {
          spotId: 2,
          userId: 2,
          startDate: '2025-07-03',
          endDate: '2025-07-05',
          guests: 2
        },
        {
          spotId: 3,
          userId: 3,
          startDate: '2025-09-20',
          endDate: '2025-09-30',
          guests: 3
        },
        {
          spotId: 4,
          userId: 1,
          startDate: '2026-07-15',
          endDate: '2026-07-22',
          guests: 4
        },
        {
          spotId: 5,
          userId: 2,
          startDate: '2027-10-01',
          endDate: '2027-10-07',
          guests: 5
        },
        {
          spotId: 6,
          userId: 3,
          startDate: '2028-03-10',
          endDate: '2028-03-17',
          guests: 6
        },
        {
          spotId: 7,
          userId: 1,
          startDate: '2026-08-20',
          endDate: '2026-08-27',
          guests: 7
        },
        {
          spotId: 8,
          userId: 2,
          startDate: '2027-06-12',
          endDate: '2027-06-19',
          guests: 8
        },
        {
          spotId: 9,
          userId: 3,
          startDate: '2028-01-05',
          endDate: '2028-01-10',
          guests: 9
        },
        {
          spotId: 10,
          userId: 3,
          startDate: '2024-02-15',
          endDate: '2024-02-20',
          guests: 5
        },
        {
          spotId: 11,
          userId: 1,
          startDate: '2024-05-10',
          endDate: '2024-05-15',
          guests: 7
        },
        {
          spotId: 12,
          userId: 2,
          startDate: '2024-08-22',
          endDate: '2024-08-27',
          guests: 3
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
      startDate: { [Op.in]: [ '2024-06-03', '2025-07-03', '2025-09-20', '2026-07-15', '2027-10-01', '2028-03-10', '2026-08-20', '2027-06-12', '2028-01-05', '2024-02-15', '2024-05-10', '2024-08-22'] }
    }, {});
  }
};
