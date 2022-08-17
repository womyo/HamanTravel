const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
let path = require('path')
let history = require('connect-history-api-fallback');

let corsOptions = {
    origin: "ec2-15-164-165-238.ap-northeast-2.compute.amazonaws.com"
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(history());
app.use(express.static(path.join(__dirname, "public")));

const db = require("./app/models");

db.sequelize.sync({force: false})

require("./app/routes/places.route")(app);

require("./app/routes/restaurants.route")(app);

require("./app/routes/boards.route")(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})