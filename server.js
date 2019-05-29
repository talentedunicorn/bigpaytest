const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: process.env.PORT })

wss.on(`connection`, ws => {
  ws.on('message', message => {
    console.log(`Received: ${message}`)
    wss.clients.forEach(client => {
      if(client !== ws) {
        // Implement nothing
      }
    })
  })

  ws.send('Talk to me darlin')

  setTimeout(() => {
    setInterval(() => {
      let date = new Date()
      console.log(`Sending: ${date}`)
      ws.send(date.toString())
    }, 1000)
  }, 1000)

})
