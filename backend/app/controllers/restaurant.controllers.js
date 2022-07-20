const db = require("../models");
const Restaurant = db.restaurants;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const type = req.params.type;
    let condition = type ? { type: { [Op.like]: "%" + type + "%" } } : null;
  
    Restaurant.findAll({ where: condition })
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