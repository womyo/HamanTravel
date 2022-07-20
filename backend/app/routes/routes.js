module.exports = app => {
    const places = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    router.post("/", places.create);

    router.get("/", places.findAll);
    
    router.get("/keyword/:keyword", places.findAll);

    app.use("/api/places", router);
}