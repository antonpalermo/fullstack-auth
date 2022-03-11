const http = require('http')
const express = require('express')

require('dotenv').config()

const main = async () => {
  const app = express()
  const server = http.createServer(app)

  app.get('/', (_, res) => {
    res.status(200).send({ status: 'ok' })
  })

  new Promise(res => server.listen(process.env.PORT, () => res()))
  console.log('server started on http://localhost:' + process.env.PORT)
}

main().catch(err => console.log(err))
