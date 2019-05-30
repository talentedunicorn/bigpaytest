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
        setMessages(messages => messages.concat(message.data))
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
    <main>
      <Heading level={2} text={`Printing date and time from ${process.env.socketURL}`}/>
      { connected && <p>Connected</p> }
      { !connected && <Button handleClick={() => connect()}>Connect</Button>}
      <List minimal={true}>
        { messages.map((message, index) => {
          return (<li key={index}>{message}</li>)
        })}
      </List>
    </main>
  )
}

export default Page1
