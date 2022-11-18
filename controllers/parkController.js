const db = require('../config/dbsequelize')
const User = require('../models/dbmodel');

const parse = function (timeIn, timeOut) {
  timeIn = new Date(timeIn);
  timeOut = new Date(timeOut);
  let dur = timeOut - timeIn;

  let day = Math.floor(dur / 1000 / 3600 / 24);
  let hour = Math.floor((dur / 1000 / 60 / 60) - (day * 24));
  let minute = Math.floor((dur / 1000 / 60) - (day * 24 * 60) - (hour * 60))
  let second = Math.floor(dur / 1000 - (day * 24 * 3600) - (hour * 3600) - (minute * 60))
  return { day, hour, minute, second };
}

module.exports = {
  home: async (req, res) => {
    try {
      return res.send({
        'msg': 'Helloworld'
      });
    } catch (error) {
      console.log(error)
    }
  },

  insert: async (req, res) => {
    try {
      const { type, timeIn, timeOut } = req.body;
      const { day, hour, minute, second } = parse(timeIn, timeOut)
      const D_mobil = 80000;
      const D_motor = 40000;
      const H_mobil = 5000;
      const H_motor = 2000;

      if (type == 'mobil') {
        let mobilPrice = (day * D_mobil) + (hour * H_mobil);
        if (minute >= 1) { mobilPrice += H_mobil; }

        await User.create({
          type: type,
          timeIn: timeIn,
          timeOut: timeOut,
          price: mobilPrice
        })
        return res.send({
          'status': 'success insert mobil',
          'price': mobilPrice
        })
      }
      else if (type == 'motor') {
        let motorPrice = (day * D_motor) + (hour * H_motor);
        if (minute >= 1) { motorPrice += H_motor; }

        await User.create({
          type: type,
          timeIn: timeIn,
          timeOut: timeOut,
          price: motorPrice
        })
        return res.send({
          'status': 'success insert motor',
          'price': motorPrice
        })
      } else {
        return res.status(400).send({
          'msg': 'tipe kendaraan tidak terdefinisi!'
        });
      }
    } catch (error) {
      console.log(error)
    }
  },

  getData: async (req, res) => {
    try {
      let response = await db.query(`select * from users`);
      var result = response[0];

      if (Object.keys(req.body).length != 0) {
        if (req.body.type) {
          if (req.body.type == 'mobil') {
            result = result.filter((n) => n.type == 'mobil');
          } else if (req.body.type == 'motor') {
            result = result.filter((n) => n.type == 'motor');
          } else if (req.body.type == 'all') {
            result = result;
          }
        }
        
        if ((req.body.priceMin != undefined) && (req.body.priceMax != undefined)) {
          result = result.filter((n) => (n.price > req.body.priceMin) && (n.price < req.body.priceMax))
        } else if ((req.body.priceMin != undefined)) {
          result = result.filter((n) => n.price > req.body.priceMin)
        } else if ((req.body.priceMax != undefined)) {
          result = result.filter((n) => n.price < req.body.priceMax)
        }
        
        if (req.body.timeMin != undefined && (req.body.timeMax != undefined)) {
          var timeMin = new Date(req.body.timeMin);
          var timeMax = new Date(req.body.timeMax);
          result = result.filter((n) => (n.timeIn >= timeMin) && (n.timeOut <= timeMax));
        } else if ((req.body.timeMin != undefined)) {
          var timeMin = new Date(req.body.timeMin);
          result = result.filter((n) => n.timeIn >= timeMin)
        } else if ((req.body.timeMax != undefined)){
          var timeMax = new Date(req.body.timeMax);
          result = result.filter((n) => n.timeOut <= timeMax)
        }

        return res.send(result);
      } else {
        return res.send(result);
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteById: async (req, res) => {
    try {
      const result = await User.findAll({ where: { id: req.params.id } });
      if (result.length > 0) {
        await User.destroy({ where: { id: req.params.id } })
        return res.send({
          'status': 'deleted success'
        });
      } else {
        return res.status(400).send({
          'status': 'failed',
          'msg': 'data not found'
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
}