const express = require('express')

const path = require('path')
const app = express()
const server = require('http').Server(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname + '/public')))

app.get('/',(req,res)=>{res.render('index')})

let online = 0
io.on('connection',(socket) =>{
    online ++
    console.log(`A user just connected`)
    io.sockets.emit('users',{online:online})
    socket.on('disconnect',()=>{
      online --
      console.log(`A user just disconnected`)
      io.sockets.emit('users',{online:online})
    })
    socket.on('chat',(obj)=>{
      console.log(obj)
      io.sockets.emit('chat',obj)
    })

})

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})