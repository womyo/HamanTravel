const db = require("../models");
const Restaurant = db.restaurants;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const type = req.params.type;
    const targetLatitude = req.params.latitude;
    const targetLongitude = req.params.longitude;

    let condition = type ? { type: { [Op.eq]: type } } : null;
    let latitude, longitude, latDiff, lonDiff, distance;
    let dataArray = []

    Restaurant.findAll({where: condition})
      .then(data => {
        data.forEach(element => {
          latitude = element.dataValues.latitude;
          longitude = element.dataValues.longitude;
          latDiff = targetLatitude - latitude;
          lonDiff = targetLongitude - longitude;
          distance = latDiff ** 2 + lonDiff ** 2

          if (distance <= 0.0002) {
            dataArray.push(element);
          }
          
        });

        res.send(dataArray);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };