'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://fakeReviewImageUrlOne.com'
      },
      {
        reviewId: 2,
        url: 'https://fakeReviewImageUrlTwo.com'
      },
      {
        reviewId: 3,
        url: 'https://fakeReviewImageUrlThree.com'
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://fakeReviewImageUrlOne.com', 'https://fakeReviewImageUrlTwo.com', 'https://fakeReviewImageUrlThree.com'] }
    }, {});
  }
};
