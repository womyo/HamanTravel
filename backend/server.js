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
app.get('/', (req, res) => {
    res.json({message: 'Hello World!'})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})