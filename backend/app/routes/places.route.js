module.exports = app => {
    const places = require("../controllers/places.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", places.create);

    router.get("/", places.findAll);
    
    router.get("/keyword/:keyword", places.findAll);

    app.use("/api/place", router);
}