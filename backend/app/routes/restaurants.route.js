module.exports = app => {
    const restaurants = require("../controllers/restaurants.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", restaurants.findAll);
    
    router.get("/type/:type/latitude/:latitude/longitude/:longitude", restaurants.findAll);

    app.use("/api/restaurant", router);
}