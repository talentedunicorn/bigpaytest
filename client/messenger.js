import React, { useState } from "react"

const Messenger = ({onSend}) => {
  const [message, setMessage] = useState()
  return (
  <section>
    <form onSubmit={e => {
      e.preventDefault() 
      onSend(message)
      return setMessage()
    }}>
      <input type="text" placeholder="Type message" value={message} onChange={e => setMessage(e.target.value)} />
      <button>Send</button>
    </form>
  </section>)
}

export default Messenger
