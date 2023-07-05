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
  address: '123 Main St',
  city: 'Austin',
  state: 'TX',
  country: 'United States',
  lat: 30.2672,
  lng: 97.7431,
  name: 'FakeNameOne',
  description: "Welcome to Austin, Texas. This charming residence offers a comfortable and inviting atmosphere, perfect for a relaxing getaway. With its convenient location and affordable price of $200.00 per night, it's an ideal choice for travelers looking to explore the vibrant city of Austin.",
  price: 200.00
  },
  {
  ownerId: 2,
  address: '456 Elm St',
  city: 'Hartford',
  state: 'WI',
  country: 'United States',
  lat: 43.3226,
  lng: 88.3862,
  name: 'FakeNameTwo',
  description: "Welcome to my beautiful home in Hartford, Wisconsin. This stunning property provides a luxurious and tranquil retreat, offering breathtaking views of the surrounding countryside. Immerse yourself in nature and indulge in the finest amenities. With a price of $400.00 per night, it's an exceptional choice for those seeking the ultimate getaway.",
  price: 400.00
  },
  {
  ownerId: 3,
  address: '789 Oak St',
  city: 'New York City',
  state: 'NY',
  country: 'United States',
  lat: 40.7128,
  lng: 74.0060,
  name: 'FakeNameThree',
  description: "Experience the vibrant energy of the Big Apple right at your doorstep. This modern and chic accommodation offers comfort and convenience, making it the perfect base for exploring the city that never sleeps. Priced at $300.00 per night, it's a great value for your New York adventure.",
  price: 300.00
  },
  {
  ownerId: 1,
  address: '321 Pine St',
  city: 'Seattle',
  state: 'WA',
  country: 'United States',
  lat: 47.6062,
  lng: 122.3321,
  name: 'FakeNameFour',
  description: "This charming house offers a peaceful and idyllic setting, with easy access to the city's famous attractions. Relax on the porch and enjoy the tranquil views or take a short walk to the bustling downtown area. With a price of $150.00 per night, it's a budget-friendly choice for your Seattle getaway.",
  price: 150.00
  },
  {
  ownerId: 2,
  address: '654 Maple St',
  city: 'Denver',
  state: 'CO',
  country: 'United States',
  lat: 39.7392,
  lng: 104.9903,
  name: 'FakeNameFive',
  description: "This sleek and contemporary apartment offers a prime location and stylish accommodations. Discover the vibrant city life, visit popular attractions, and indulge in the diverse culinary scene. With a price of $250.00 per night, it's an excellent choice for urban explorers.",
  price: 250.00
  },
  {
  ownerId: 3,
  address: '987 Walnut St',
  city: 'Chicago',
  state: 'IL',
  country: 'United States',
  lat: 41.8781,
  lng: 87.6298,
  name: 'FakeNameSix',
  description: "This stylish loft offers a blend of modern comfort and urban charm, perfect for those seeking a trendy accommodation in the heart of the city. Enjoy the breathtaking skyline, explore cultural attractions, and experience the vibrant nightlife. Priced at $180.00 per night, it's a fantastic choice for your Chicago getaway.",
  price: 180.00
  },
  {
  ownerId: 1,
  address: '135 Oakwood Ave',
  city: 'Los Angeles',
  state: 'CA',
  country: 'United States',
  lat: 34.0522,
  lng: 118.2437,
  name: 'FakeNameSeven',
  description: "Indulge in the epitome of elegance and sophistication with this exclusive property. Enjoy the breathtaking views, relax by the pool, and experience the glamorous lifestyle of the entertainment capital of the world. Priced at $500.00 per night, it's a dream destination for luxury seekers.",
  price: 500.00
  },
  {
  ownerId: 2,
  address: '753 Palm Ave',
  city: 'Miami',
  state: 'FL',
  country: 'United States',
  lat: 25.7617,
  lng: 80.1918,
  name: 'FakeNameEight',
  description: "Embrace the sun, sand, and sea with this exclusive beachside retreat. Indulge in the tropical paradise, relax by the pool, and experience the vibrant nightlife of South Beach. With a price of $400.00 per night, it's an idyllic choice for your Miami vacation.",
  price: 400.00
  },
  {
  ownerId: 3,
  address: '246 High St',
  city: 'El Paso',
  state: 'TX',
  country: 'United States',
  lat: 51.5074,
  lng: 10.1278,
  name: 'FakeNameNine',
  description: "This charming residence combines traditional southern hospitality with a touch of British flair. Enjoy the peaceful surroundings, explore the historic landmarks, and savor the local cuisine. With a price of $300.00 per night, it's a delightful choice for a unique Texan experience.",
  price: 300.00
  }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['FakeNameOne', 'FakeNameTwo', 'FakeNameThree', 'FakeNameFour', 'FakeNameFive', 'FakeNameSix', 'FakeNameSeven', 'FakeNameEight', 'FakeNameNine' ] }
    }, {});
  }
};
