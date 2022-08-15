const db = require("../models");
const Board = db.boards;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const keyword = req.params.keyword;
    let condition = keyword ? { keyword: { [Op.like]: "%" + keyword + "%" } } : null;
    Board.findAll({where: condition})
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