'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'It has okay but had a leaky roof. oh well',
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
        review: 'It was the best place i have ever stayed in. I would for sure recommend it',
        stars: 5
      },

      {
        spotId: 4,
        userId: 1,
        review: 'The house was spacious and beautifully decorated. However, the kitchen appliances were outdated.',
        stars: 2
      },

      {
        spotId: 5,
        userId: 2,
        review: 'The location was fantastic, with stunning views from every room. The only downside was the noisy neighbors.',
        stars: 1
      },

      {
        spotId: 6,
        userId: 3,
        review: 'We absolutely loved our stay! The house was immaculate and had all the amenities we needed. The host was also very responsive and helpful.',
        stars: 5
      },

      {
        spotId: 7,
        userId: 1,
        review: 'The Hollywood Hills location was unbeatable. The house had a luxurious feel and the pool was a great bonus. However, the Wi-Fi signal was weak in some areas.',
        stars: 4
      },

      {
        spotId: 8,
        userId: 2,
        review: 'The beachfront property was a dream come true. We enjoyed relaxing by the private pool and listening to the sound of waves.',
        stars: 3
      },

      {
        spotId: 9,
        userId: 3,
        review: 'The elegant spot in the heart of London, Texas, exceeded our expectations. We had a memorable stay and would highly recommend it to others.',
        stars: 5
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [3, 4, 5, 2, 1] }
    }, {});
  }
};
