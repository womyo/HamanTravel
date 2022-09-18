const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
let path = require('path');
let history = require('connect-history-api-fallback');
const db = require("./app/models");
const Role = db.role;

let corsOptions = {
    origin: "http://ec2-15-164-165-238.ap-northeast-2.compute.amazonaws.com"
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(history());
app.use(express.static(path.join(__dirname, "public")));

db.sequelize.sync({force: false});

require("./app/routes/places.route")(app);

require("./app/routes/restaurants.route")(app);

require("./app/routes/boards.route")(app);

require('./app/routes/auth.route')(app);

require('./app/routes/user.route')(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})