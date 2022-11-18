const express = require('express');
const route = express.Router();
const { 
  getData,
  insert,
  deleteById,
  home
} = require('../controllers/parkController');

route.get('/', home)
route.post('/insert', insert);
route.post('/parklist', getData);
route.delete('/parklist/:id', deleteById);

module.exports = route;