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

  wss.clients.forEach(client => { 
    if (client !== ws) {
      setTimeout(() => {
        return client.send(`${new Date()}`)
      }, 1000)
    }
  })

  ws.send('Talk to me darlin')
})
