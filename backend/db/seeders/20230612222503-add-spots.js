'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: 'fakeAddressOne',
        city: 'Austin',
        state: 'Texas',
        country: 'United States',
        lat: 30.2672,
        lng: -97.7431,
        name: 'FakeNameOne',
        description: 'this is a goood spot',
        price: 300.00
      },
      {
        ownerId: 2,
        address: 'fakeAddressTwo',
        city: 'Hartford',
        state: 'Wisconsin',
        country: 'United States',
        lat: 43.3226,
        lng: -88.3862,
        name: 'FakeNameTwo',
        description: 'this is the BEST spot',
        price: 200.00
      },
      {
        ownerId: 3,
        address: 'fakeAddressThree',
        city: 'New York City',
        state: 'New York',
        country: 'United States',
        lat: 40.7128,
        lng: -74.0060,
        name: 'FakeNameThree',
        description: 'this is an alright spot',
        price: 800.00
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['FakeNameOne', 'FakeNameTwo', 'FakeNameThree'] }
    }, {});
  }
};
