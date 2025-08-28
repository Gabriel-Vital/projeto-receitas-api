const express = require('express')
const cors = require('cors')
const routes = require('./src/routes/routes.route')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})