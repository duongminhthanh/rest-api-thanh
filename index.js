const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./database')
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/cats', db.getCats)
app.get('/cats/:id', db.getCatById)
app.post('/cats', db.createCat)
app.put('/cats/:id', db.updateCat)
app.delete('/cats/:id', db.deleteCat)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

