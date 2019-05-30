import React, { useState, useEffect} from "react"
import { Heading, List, Button } from "talentedunicorn-ui-kit"

const Page1 = _ => {
  const [messages, setMessages] = useState([])
  const [connected, setConnected] = useState(false)

  const connect = _ => {
    const socket = new WebSocket(process.env.socketURL)
    socket.onopen = _ => setConnected(true)
    socket.onerror = error => console.error(error)
    socket.onclose = _ => {
      setConnected(false)
      console.log('closing...')
    }
    socket.onmessage = message => {
      if (Boolean(Date.parse(message.data))) {
        let latency = new Date() - new Date(Date.parse(message.data))
        setMessages(messages => messages.concat(`Server: ${message.data} - latency ${latency}ms`))
      }
    }
  }

  useEffect(() => {
    connect()
    return () => {
      console.log('Closing socket...')
    }
  }, [])

  return (
    <main className="Page1">
      <header>
        <Heading level={2} text={`Printing date and time from ${process.env.socketURL}`}/>
        { connected && <p style={{ margin: `calc(var(--space) * 2)`}}>Connected</p> }
        { !connected && <Button style={{ margin: `var(--space)`}} handleClick={() => connect()}>Connect</Button>}
      </header>
      <div className="Server-messages">
        <List minimal={true}>
          { messages.map((message, index) => {
            return (<li className="Server-message" key={index}>{message}</li>)
          })}
        </List>
      </div>
    </main>
  )
}

export default Page1
