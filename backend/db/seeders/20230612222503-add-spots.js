'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: 'fakeAddressOne',
        city: 'Austin',
        state: 'TX',
        country: 'United States',
        lat: 30.2672,
        lng: 97.7431,
        name: 'FakeNameOne',
        description: 'this is a goood spot',
        price: 200.00
      },
      {
        ownerId: 2,
        address: 'fakeAddressTwo',
        city: 'Hartford',
        state: 'WI',
        country: 'United States',
        lat: 43.3226,
        lng: 88.3862,
        name: 'FakeNameTwo',
        description: 'this is the BEST spot',
        price: 400.00
      },
      {
        ownerId: 3,
        address: 'fakeAddressThree',
        city: 'New York City',
        state: 'NY',
        country: 'United States',
        lat: 40.7128,
        lng: 74.0060,
        name: 'FakeNameThree',
        description: 'this is an alright spot',
        price: 300.00
      },
      {
        ownerId: 1,
        address: 'fakeAddressFour',
        city: 'Seattle',
        state: 'WA',
        country: 'United States',
        lat: 47.6062,
        lng: 122.3321,
        name: 'FakeNameFour',
        description: 'A cozy spot near the waterfront',
        price: 150.00
      },
      {
        ownerId: 2,
        address: 'fakeAddressFive',
        city: 'Denver',
        state: 'CO',
        country: 'United States',
        lat: 39.7392,
        lng: 104.9903,
        name: 'FakeNameFive',
        description: 'A modern spot in the heart of the city',
        price: 250.00
      },
      {
        ownerId: 3,
        address: 'fakeAddressSix',
        city: 'Chicago',
        state: 'IL',
        country: 'United States',
        lat: 41.8781,
        lng: 87.6298,
        name: 'FakeNameSix',
        description: 'An urban spot with great city views',
        price: 180.00
      },
      {
        ownerId: 1,
        address: 'fakeAddressSeven',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States',
        lat: 34.0522,
        lng: 118.2437,
        name: 'FakeNameSeven',
        description: 'A luxurious spot in the Hollywood Hills',
        price: 500.00
      },
      {
        ownerId: 2,
        address: 'fakeAddressEight',
        city: 'Miami',
        state: 'FL',
        country: 'United States',
        lat: 25.7617,
        lng: 80.1918,
        name: 'FakeNameEight',
        description: 'A beachfront spot with a private pool',
        price: 400.00
      },
      {
        ownerId: 3,
        address: 'fakeAddressNine',
        city: 'London',
        state: 'TX',
        country: 'United Kingdom',
        lat: 51.5074,
        lng: 10.1278,
        name: 'FakeNameNine',
        description: 'An elegant spot in the heart of London',
        price: 300.00
      },
      {
        ownerId: 1,
        address: 'fakeAddressTen',
        city: 'Paris',
        state: 'MI',
        country: 'France',
        lat: 48.8566,
        lng: 2.3522,
        name: 'FakeNameTen',
        description: 'A charming spot near the Eiffel Tower',
        price: 280.00
      },
      {
        ownerId: 2,
        address: 'fakeAddressEleven',
        city: 'Sydney',
        state: 'AZ',
        country: 'Australia',
        lat: 33.8688,
        lng: 151.2093,
        name: 'FakeNameEleven',
        description: 'A waterfront spot with breathtaking views',
        price: 380.00
      },
      {
        ownerId: 3,
        address: 'fakeAddressTwelve',
        city: 'Tokyo',
        state: 'GA',
        country: 'Japan',
        lat: 35.6762,
        lng: 139.6503,
        name: 'FakeNameTwelve',
        description: 'A modern spot in the bustling city of Tokyo',
        price: 320.00
      },
      {
        ownerId: 1,
        address: 'fakeAddressThirteen',
        city: 'Rio de Janeiro',
        state: 'IL',
        country: 'Brazil',
        lat: 22.9068,
        lng: 43.1729,
        name: 'FakeNameThirteen',
        description: 'A beachfront spot in the vibrant city of Rio',
        price: 420.00
      },
      {
        ownerId: 2,
        address: 'fakeAddressFourteen',
        city: 'Berlin',
        state: 'KS',
        country: 'Germany',
        lat: 52.5200,
        lng: 13.4050,
        name: 'FakeNameFourteen',
        description: 'A trendy spot in the artistic district of Berlin',
        price: 220.00
      },
      {
        ownerId: 3,
        address: 'fakeAddressFifteen',
        city: 'Barcelona',
        state: 'ME',
        country: 'Spain',
        lat: 41.3851,
        lng: 2.1734,
        name: 'FakeNameFifteen',
        description: 'A sunny spot with a view of the Mediterranean',
        price: 350.00
      },
      {
        ownerId: 1,
        address: 'fakeAddressSixteen',
        city: 'Rome',
        state: 'GA',
        country: 'Italy',
        lat: 41.9028,
        lng: 12.4964,
        name: 'FakeNameSixteen',
        description: 'A historic spot near the Colosseum',
        price: 270.00
      },
      {
        ownerId: 2,
        address: 'fakeAddressSeventeen',
        city: 'Cape Town',
        state: 'MA',
        country: 'South Africa',
        lat: 33.9249,
        lng: 18.4241,
        name: 'FakeNameSeventeen',
        description: 'A scenic spot with panoramic mountain views',
        price: 380.00
      },
      {
        ownerId: 3,
        address: 'fakeAddressEighteen',
        city: 'Dubai',
        state: 'CT',
        country: 'United Arab Emirates',
        lat: 25.2048,
        lng: 55.2708,
        name: 'FakeNameEighteen',
        description: 'A luxurious spot in the iconic Burj Khalifa',
        price: 600.00
      },
      {
        ownerId: 1,
        address: 'fakeAddressNineteen',
        city: 'Toronto',
        state: 'CO',
        country: 'Canada',
        lat: 43.6519,
        lng: 79.3817,
        name: 'FakeNameNineteen',
        description: 'A cozy spot in the heart of downtown Toronto',
        price: 180.00
      },
      {
        ownerId: 2,
        address: 'fakeAddressTwenty',
        city: 'Mumbai',
        state: 'IN',
        country: 'India',
        lat: 19.0760,
        lng: 72.8777,
        name: 'FakeNameTwenty',
        description: 'A vibrant spot in the bustling city of Mumbai',
        price: 280.00
      },
      {
        ownerId: 3,
        address: 'fakeAddressTwentyTwo',
        city: 'San Francisco',
        state: 'CA',
        country: 'United States',
        lat: 37.7749,
        lng: 122.4194,
        name: 'FakeNameTwentyTwo',
        description: 'A trendy spot in the heart of San Francisco',
        price: 350.00
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['FakeNameOne', 'FakeNameTwo', 'FakeNameThree'] }
    }, {});
  }
};
