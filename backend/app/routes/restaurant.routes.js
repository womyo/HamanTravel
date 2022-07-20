module.exports = app => {
    const restaurant = require("../controllers/restaurant.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", restaurant.findAll);
    
    // router.get("/keyword/:keyword", restaurant.findAll);

    app.use("/api/restaurant", router);
}