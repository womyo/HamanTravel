module.exports = app => {
    const boards = require("../controllers/boards.controller.js");
  
    var router = require("express").Router();
  
    // router.post("/", boards.create);

    router.get("/", boards.findAll);
    
    app.use("/api/board", router);
}