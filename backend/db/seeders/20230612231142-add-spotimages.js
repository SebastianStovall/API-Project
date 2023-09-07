'use strict';

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://static01.nyt.com/images/2023/04/05/multimedia/05JAPANHOUSES-10-vfqc/05JAPANHOUSES-10-vfqc-mediumSquareAt3X.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42409434/original/e16c6d3a-7de5-4235-8979-b035d3d3a81f.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42409434/original/3f83ab57-f355-487c-a0ec-21b288988567.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/d0a17619-624a-4e73-8d75-e2b9f1b277c7.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/d0a17619-624a-4e73-8d75-e2b9f1b277c7.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cabinsathickoryridge.com/media/The-Lodge-Spring.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-844185103698986751/original/49e436b8-9e3c-4a37-8c68-1acee7b6e8f1.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-844185103698986751/original/f1d1de31-279d-45a8-877d-ce613be9d23e.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-844185103698986751/original/0dfe07fc-2502-4508-a0e4-6ee080f1700c.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-844185103698986751/original/72625c7e-cdc7-4a87-b319-030f41f91cb9.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/2bcf49f8-f594-4f10-b0ea-ae1f447fc0c2.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-587661885193803501/original/6fe3bae5-4c93-4fea-8e17-045f0a057ac0.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-587661885193803501/original/e8580f28-4cdc-44ab-8623-52da0314bd17.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-587661885193803501/original/f0b632e9-f4f0-437b-8937-d879b8da0485.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-587661885193803501/original/e0fc78af-2899-4298-92e3-a4d0a1156313.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://lovehomedesigns.com/wp-content/uploads/2021/12/suburban-house-style-122221.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-928893488060783005/original/a991a065-6f4c-4bba-83aa-161c1bbba7d3.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-928893488060783005/original/9c1a23f5-6d11-498c-856c-082c07ccc9cc.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-928893488060783005/original/548dcece-561b-4e14-901f-7073bcd13c31.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-928893488060783005/original/548dcece-561b-4e14-901f-7073bcd13c31.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://luxesource.com/wp-content/uploads/2021/05/LX_SouthEast13_HOM_Benedict_10.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-546923400311446203/original/4c43b516-a11b-49bb-a2ed-d4b0c8cc34a5.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-546923400311446203/original/02eb20aa-6f28-4204-a91a-a125878d027f.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-546923400311446203/original/b285d6e9-7f33-4c4e-8b84-2dae13a9f5d1.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-546923400311446203/original/2332cde9-89bb-46d5-b803-a1f91e7e12d9.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://interiordesign.net/wp-content/uploads/2022/02/Interior-Design-Beachhouse-Bates-Masi-and-Architects-Amagansett-idx220101_boy_Res_BeachHouse01_2-2-1024x684.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-687513507110348157/original/e2a0b7bd-96fe-4593-b87f-d714ef2f0cf3.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-687513507110348157/original/1464df1a-0692-4e76-8688-16e499a63695.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-687513507110348157/original/969e113b-a45e-48e1-b3de-df9d0725a4a6.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-687513507110348157/original/92c7df14-4379-4e31-951b-82cfd10953f1.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/503e5cef-8bc9-493d-a11e-d24f16f14187.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/503e5cef-8bc9-493d-a11e-d24f16f14187.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/b7a54b21-cc50-4697-9d50-9403b46cabe3.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/b7a54b21-cc50-4697-9d50-9403b46cabe3.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-662235707633871887/original/314d8f94-7ca5-4f75-a898-9e13506933aa.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-662235707633871887/original/50fadc51-c943-45cb-968b-e6e1dc9cdd2e.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-662235707633871887/original/207159b8-98e4-457b-b6d4-7727f74797a4.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-662235707633871887/original/d91b5ac3-2533-4f3b-8c79-f7276dd9c7a8.jpeg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://www.jamesedition.com/stories/wp-content/uploads/2022/03/mansions_main_fin.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-694362085459002000/original/fd2ed2e9-0479-4f43-801b-019fc1bbf9aa.png',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-694362085459002000/original/8d7637cb-331c-4d08-b479-ac02aeea9bc6.png',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-694362085459002000/original/db09337f-e68a-4b3e-9d4f-660c32df9633.png',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-694362085459002000/original/046c0eb0-cf8e-439a-a087-74d0513b473d.png',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/60facdee-7119-4e9a-bbd6-b2c5e95b7327.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/4a4590fc-abc0-4eab-ae95-f10fa684908f.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/d10d1e0e-9694-435d-9f10-32a50605e14b.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/b5162419-bb33-4d1a-98d0-3a16eaad082c.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/b5162419-bb33-4d1a-98d0-3a16eaad082c.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/bc8d77d4-e617-44ca-8b15-b8b2ce55df35.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-46792848/original/26beb266-260b-438f-ae89-4450bc45142b.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-22465553/original/21e88723-f1d4-486d-a114-52a0e4407d1e.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-22465553/original/5278afe4-fff1-41f0-849f-b786317edcd2.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-22465553/original/dde00ffd-7af0-48d5-978b-4027d4a4284e.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://www.coloradohomesmag.com/content/uploads/2022/11/x/j/gerber-berend-williams-exterior-one-point-entry-09-15-21-web-scaled-1.jpeg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-616473242380750899/original/e8c29b93-64b7-45fe-ae60-7c9da16be736.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-616473242380750899/original/1944cb3b-83b6-448e-944c-bbcd53aaf2e8.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-616473242380750899/original/bf2a8c5b-e474-4325-a7d6-f890d2d70f3b.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-616473242380750899/original/76c36d49-9b05-46a5-973e-fb554b2c0109.jpeg',
        preview: false
      }

    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12] }
    }, {});
  }
};
