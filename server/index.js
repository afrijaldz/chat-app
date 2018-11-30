const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', socket => {

  socket.on('data', data => {
    io.emit('pesan', data)
  })
  
})

const PORT = 3333
http.listen(PORT, () => {
  console.log(`server run on port ${PORT}`)
})