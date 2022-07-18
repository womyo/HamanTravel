module.exports = app => {
    const places = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", places.create);
  
    // Retrieve all Tutorials
    router.get("/", places.findAll);

    app.use("/api/places", router);
}