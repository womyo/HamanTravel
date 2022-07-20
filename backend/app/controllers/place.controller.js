const db = require("../models");
const Place = db.place;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const place = {
    id: req.body.id,
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  Place.create(place)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating."
      });
    });
};

exports.findAll = (req, res) => {
  const keyword = req.params.keyword;
  let condition = keyword ? { keyword: { [Op.like]: "%" + keyword + "%" } } : null;

  Place.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

