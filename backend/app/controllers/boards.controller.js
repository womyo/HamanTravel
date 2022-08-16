const db = require("../models");
const Board = db.boards;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const boardPost = {
    code: req.body.code,
    userId: req.body.userId,
    title: req.body.title,
    contents: req.body.contents
  };

  Board.create(boardPost)
    .then(data => {
      res.send({success:true});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating."
      });
    });
};

exports.findAll = (req, res) => {
  let code = req.query.code;
  let title = req.query.title;
  let pageNum = req.query.page;
  let offset = 0;
  let limit = 10;
  let whereCondition;

  if(pageNum > 1){
    offset = 0 + limit * (pageNum - 1);
  }
  
  let codeCondition = code ? { code: { [Op.eq]: code } } : null;
  let titleCondition = title ? { title: { [Op.like]: "%" + title + "%" } } : null;

  if (codeCondition && titleCondition) {
    whereCondition = Object.assign(codeCondition, titleCondition);
  }
  else if (codeCondition) {
    whereCondition = codeCondition;
  }
  else if (titleCondition) {
    whereCondition = titleCondition;
  }
  else {
    whereCondition = null;
  }
  let condition = !pageNum ? undefined : {where: whereCondition, offset: offset, limit: limit, order: [['id', 'DESC']]}

  Board.findAll(condition)
    .then(async data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Board.findOne({ where: { id: id } })
    .then(async data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    });
}

exports.update = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const boardPost = {
    id: req.body.id,
    code: req.body.code,
    userId: req.body.userId,
    title: req.body.title,
    contents: req.body.contents
  };

  Board.update(boardPost, {where: {id: req.body.id}})
    .then(data => {
      res.send({success:true});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating."
      });
    });
};

exports.destroy = async (req, res) => {
  await Board.destroy({where: {id: req.query.id}})
    .then(result => {
      res.send({success:true, result:result});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating."
      });
    });
};