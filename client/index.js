import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"

import Messenger from "./messenger"

import "./index.css"

const App = _ => {
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
      <h1>{`Printing date and time from ${process.env.socketURL}`}</h1>
      { connected && <p>Connected</p>}
      <ul>
        { messages.map((message, index) => {
          return (<li key={index}>{message}</li>)
        })}
      </ul>
    </main>
  )
}

ReactDOM.render(<App/>, document.querySelector('#app'))
