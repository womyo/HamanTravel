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
  console.log(whereCondition)
  let condition = !pageNum ? undefined : {where: whereCondition, offset: offset, limit: limit, order: [['id', 'DESC']]}

  Board.findAll(condition)
    .then(async data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};