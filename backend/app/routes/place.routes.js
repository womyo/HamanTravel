module.exports = app => {
    const place = require("../controllers/place.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", place.create);

    router.get("/", place.findAll);
    
    router.get("/keyword/:keyword", place.findAll);

    app.use("/api/place", router);
}