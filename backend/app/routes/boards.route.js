module.exports = app => {
    const boards = require("../controllers/boards.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", boards.create);

    router.get("/", boards.findAll);
    
    router.get("/:id", boards.findOne);

    router.put("/", boards.update);

    router.delete("/", boards.destroy);

    app.use("/api/board", router);
}