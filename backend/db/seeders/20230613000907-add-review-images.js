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
        url: 'https://interiordesign.net/wp-content/uploads/2022/02/Interior-Design-Beachhouse-Bates-Masi-and-Architects-Amagansett-idx220101_boy_Res_BeachHouse01_2-2-1024x684.jpg'
      },
      {
        reviewId: 2,
        url: 'https://luxesource.com/wp-content/uploads/2021/05/LX_SouthEast13_HOM_Benedict_10.jpg'
      },
      {
        reviewId: 3,
        url: 'https://static01.nyt.com/images/2023/04/05/multimedia/05JAPANHOUSES-10-vfqc/05JAPANHOUSES-10-vfqc-mediumSquareAt3X.jpg'
      },
      {
        reviewId: 4,
        url: 'https://www.jamesedition.com/stories/wp-content/uploads/2022/03/mansions_main_fin.jpg'
      },
      {
        reviewId: 5,
        url: 'https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg'
      },
      {
        reviewId: 6,
        url: 'https://lovehomedesigns.com/wp-content/uploads/2021/12/suburban-house-style-122221.jpg'
      },
      {
        reviewId: 7,
        url: 'https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg'
      },
      {
        reviewId: 8,
        url: 'https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg'
      },
      {
        reviewId: 9,
        url: 'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg'
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1,2,3,4,5,6,7,8,9] }
    }, {});
  }
};
