const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
let corsOptions = {
    origin: "http://localhost:8080"
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const db = require("./app/models");


db.sequelize.sync({force: false})

require("./app/routes/places.route")(app);

require("./app/routes/restaurants.route")(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})