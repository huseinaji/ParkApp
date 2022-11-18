const { DataTypes } = require('sequelize')
const db = require('../config/dbsequelize')

const User = db.define('users', {
  type: DataTypes.STRING,
  timeIn: DataTypes.DATE,
  timeOut: DataTypes.DATE,
  price: DataTypes.INTEGER
}, {
  freezeTableName: true
});

module.exports = User;

// (async () => {
//   await db.sync();
// })()