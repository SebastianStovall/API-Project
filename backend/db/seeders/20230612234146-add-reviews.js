'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'It has okay but had a leaky roof',
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Wish it had a bigger backyard. but was good other than that',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'It was the best place i have ever stayed in',
        stars: 5
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [3, 4, 5] }
    }, {});
  }
};
