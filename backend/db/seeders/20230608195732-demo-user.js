'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo1',
        lastName: 'User1',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Mike',
        lastName: 'Lewis',
        email: 'mikelewis@user.io',
        username: 'TheRealMikeLewis',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Randy',
        lastName: 'Savage',
        email: 'RandySavage@user.io',
        username: 'TheRealRandySavage',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'TheRealMikeLewis', 'TheRealRandySavage'] }
    }, {});
  }
};
