import React, { useState, useEffect} from "react"
import { Heading, List } from "talentedunicorn-ui-kit"

const Page1 = _ => {
  const socket = new WebSocket(process.env.socketURL)
  const [messages, setMessages] = useState([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    socket.onopen = _ => setConnected(true)
    socket.onerror = error => console.error(`Error ${error}`)
    socket.onclose = _ => {
      console.log('closing...')
      setConnected(false)
    }
    socket.onmessage = message => {
      if (Boolean(Date.parse(message.data))) {
        setMessages(messages => messages.concat(message.data))
      }
    }

    return () => {
      socket.close()
    }
  }, [])

  return (
    <main>
      <Heading level={1} text={`Printing date and time from ${process.env.socketURL}`}/>
      { connected && <p>Connected</p>}
      <List minimal={true}>
        { messages.map((message, index) => {
          return (<li key={index}>{message}</li>)
        })}
      </List>
    </main>
  )
}

export default Page1
