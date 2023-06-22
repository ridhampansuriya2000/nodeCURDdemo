const user = require('./User/index.js');
const token = require('./Token/index.js');
const password = require('./Password/index.js');
const AppData = require('./AppData/index.js');

module.exports = {
    ...user,
    ...token,
    ...password,
    ...AppData,
};