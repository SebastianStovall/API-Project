'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://fakelinkOne.com',
        preview: true
      },

      {
        spotId: 2,
        url: 'https://fakelinkTwo.com',
        preview: true
      },

      {
        spotId: 3,
        url: 'https://fakelinkThree.com',
        preview: true
      }

    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://fakelinkOne.com', 'https://fakelinkTwo.com', 'https://fakelinkThree.com'] }
    }, {});
  }
};
