const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log("Hello world!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})